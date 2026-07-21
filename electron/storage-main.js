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
 *   - Dev mode (`npm run dev`) or if the packaged app can't write next to
 *     its own executable (e.g. installed to Program Files, or a read-only
 *     volume) -> the standard per-user app-data directory.
 *   - Packaged app, when the folder next to the executable IS writable
 *     (this is the normal case for the portable .exe, the macOS .zip, and
 *     the Linux AppImage, since none of those live in a protected system
 *     folder) -> a "PickWheel-Data" folder right next to the app itself,
 *     so copying the app also copies its data.
 *
 * This one fallback rule handles "installed vs. portable" for all three
 * platforms without needing to special-case build targets.
 */

const { app } = require("electron");
const path = require("path");
const fs = require("fs");
const fsp = fs.promises;

function computeDataDir() {
  const fallback = path.join(app.getPath("userData"), "storage");

  if (!app.isPackaged) return fallback;

  try {
    const exePath = app.getPath("exe");
    let baseDir;

    if (process.platform === "darwin" && exePath.includes(".app/Contents/MacOS/")) {
      // .../PickWheel.app/Contents/MacOS/PickWheel -> folder containing PickWheel.app
      baseDir = path.dirname(path.dirname(path.dirname(path.dirname(exePath))));
    } else {
      // Windows portable .exe or Linux AppImage: the folder it's sitting in
      baseDir = path.dirname(exePath);
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
