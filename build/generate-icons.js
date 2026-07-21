/**
 * Generates icon.ico (Windows) and icon.icns (macOS) from the master
 * build/icons/icon.png (1024x1024), using png2icons — a pure-JS library,
 * so this works on any OS without needing Apple's iconutil or ImageMagick
 * installed.
 *
 * Run once after cloning (or whenever build/icons/icon.png changes):
 *   npm run icons
 *
 * electron-builder reads the generated icon.ico / icon.icns / icon.png
 * directly (see the "build" section of package.json), so this only needs
 * to be re-run when you actually want to change the app's icon.
 */

const fs = require("fs");
const path = require("path");
const png2icons = require("png2icons");

const ICONS_DIR = path.join(__dirname, "icons");
const SRC_PNG = path.join(ICONS_DIR, "icon.png");

if (!fs.existsSync(SRC_PNG)) {
  console.error(`Expected a master icon at ${SRC_PNG} (1024x1024 PNG) — see icon.svg in the same folder.`);
  process.exit(1);
}

const input = fs.readFileSync(SRC_PNG);

const ico = png2icons.createICO(input, png2icons.BILINEAR, 0, false);
if (ico) fs.writeFileSync(path.join(ICONS_DIR, "icon.ico"), ico);
else console.error("Failed to generate icon.ico");

const icns = png2icons.createICNS(input, png2icons.BILINEAR, 0);
if (icns) fs.writeFileSync(path.join(ICONS_DIR, "icon.icns"), icns);
else console.error("Failed to generate icon.icns");

console.log("Generated icon.ico and icon.icns in build/icons/");
