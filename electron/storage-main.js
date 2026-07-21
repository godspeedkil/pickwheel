/**
 * File-based storage backend for the Electron build.
 *
 * Same three-method contract as app/storage-web.js (get/set/delete), but
 * backed by plain JSON-value text files on disk instead of IndexedDB — so
 * "portable mode" can genuinely be portable (see computeDataDir() below).
 *
 * Each storage key becomes its own file. This mirrors the original design
 * (one key per sound clip, per item image, etc.) rather than one giant
 * JSON blob, so a single corrupted write can't take the rest of the data
 * down with it, and writes stay cheap even with many stored images/clips.
 *
 * Where data lives:
 *   - Dev mode (`npm run dev`) -> always the standard per-user app-data
 *     directory.
 *   - Windows portable .exe / Linux AppImage -> a "PickWheel-Data" folder
 *     next to the real, original executable — found via the env vars each
 *     platform's runtime provides for exactly this purpose
 *     (PORTABLE_EXECUTABLE_DIR / APPIMAGE), NOT via app.getPath('exe').
 *     Both of those formats actually run from a temporary extraction/mount
 *     location that's recreated on every launch, so deriving the folder
 *     from the running executable's own path would silently point at a
 *     different, empty temp folder every time — this was a real bug in an
 *     earlier version of this file.
 *   - macOS .zip -> a "PickWheel-Data" folder next to the .app bundle,
 *     found via app.getPath('exe') — this one's safe because unzipping
 *     just leaves a normal .app on disk with no extraction-on-launch step.
 *   - Installed builds (NSIS installer, .dmg to /Applications) -> the
 *     folder-next-to-executable attempt fails (no write access to Program
 *     Files / a protected volume), so it falls back to the standard
 *     per-user app-data directory automatically.
 */

const { app } = require("electron");
const path = require("path");
const fs = require("fs");
const fsp = fs.promises;

function computeDataDir() {
  const fallback = path.join(app.getPath("userData"), "storage");

  if (!app.isPackaged) return fallback;

  try {
    let baseDir;

    if (process.env.PORTABLE_EXECUTABLE_DIR) {
      // Windows portable build: the .exe you actually run is a self-extracting
      // stub — it unpacks the app into a fresh temp folder on every launch and
      // runs it from there, so app.getPath('exe') points into that throwaway
      // temp folder, not to wherever you put PickWheel-Portable.exe. This env
      // var is what electron-builder itself sets to the *real* location, so
      // data written here actually survives between launches.
      baseDir = process.env.PORTABLE_EXECUTABLE_DIR;
    } else if (process.env.APPIMAGE) {
      // Linux AppImage: same underlying problem — it runs from a mounted/
      // extracted temp location — but the AppImage runtime sets APPIMAGE to
      // the real path of the .AppImage file itself.
      baseDir = path.dirname(process.env.APPIMAGE);
    } else {
      // macOS .zip: unzipping just gives a normal .app on disk with no
      // extraction-on-launch step, so app.getPath('exe') is reliable here.
      const exePath = app.getPath("exe");
      if (process.platform === "darwin" && exePath.includes(".app/Contents/MacOS/")) {
        // .../PickWheel.app/Contents/MacOS/PickWheel -> folder containing PickWheel.app
        baseDir = path.dirname(path.dirname(path.dirname(path.dirname(exePath))));
      } else {
        baseDir = path.dirname(exePath);
      }
    }

    const candidate = path.join(baseDir, "PickWheel-Data");
    fs.mkdirSync(candidate, { recursive: true });
    fs.accessSync(candidate, fs.constants.W_OK);
    return candidate;
  } catch (e) {
    // Not writable — e.g. installed to Program Files, or running from a
    // read-only mount. Fall back to the standard per-user location.
    return fallback;
  }
}

const DATA_DIR = computeDataDir();
fs.mkdirSync(DATA_DIR, { recursive: true });

// Storage keys can contain characters that aren't safe in filenames
// (e.g. "custom-clip:abc123" has a colon, which Windows rejects). This
// encodes every non-alphanumeric character deterministically so the
// mapping from key -> filename never collides and never needs reversing.
function keyToFilename(key) {
  const safe = String(key).replace(/[^a-zA-Z0-9-_.]/g, (c) => "_" + c.charCodeAt(0).toString(16) + "_");
  return safe + ".json";
}

async function atomicWriteFile(filePath, content) {
  const tmp = filePath + "." + process.pid + ".tmp";
  await fsp.writeFile(tmp, content, "utf8");
  await fsp.rename(tmp, filePath); // atomic on the same volume, overwrites on all platforms
}

async function get(key) {
  const filePath = path.join(DATA_DIR, keyToFilename(key));
  try {
    const value = await fsp.readFile(filePath, "utf8");
    return { key, value };
  } catch (e) {
    if (e.code === "ENOENT") return null;
    throw e;
  }
}

async function set(key, value) {
  const filePath = path.join(DATA_DIR, keyToFilename(key));
  await atomicWriteFile(filePath, String(value));
  return { key, value };
}

async function del(key) {
  const filePath = path.join(DATA_DIR, keyToFilename(key));
  try {
    await fsp.unlink(filePath);
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
  }
  return { key, deleted: true };
}

module.exports = { get, set, delete: del, getDataDir: () => DATA_DIR };
