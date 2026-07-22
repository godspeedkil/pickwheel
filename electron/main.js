const { app, BrowserWindow, ipcMain, Menu, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const storage = require("./storage-main");

// Whether to run with GPU-accelerated rendering. On by default — it's what
// makes the wheel/slot/poster spin animations smooth — but a small minority
// of machines (older or buggy GPU drivers, some Linux/VM setups) render
// worse, flicker, or even crash with it on, so it's exposed as a Settings
// toggle for anyone who hits that. Electron can only make this decision
// once, before the app is ready, so it's read from its own tiny synchronous
// preference file here rather than through the normal async window.storage
// API the rest of the app uses — that API is IPC-based and needs a live
// renderer on the other end, which doesn't exist yet this early.
const GPU_PREFS_FILE = path.join(storage.getDataDir(), "gpu-prefs.json");
function readGpuAccelerationPref() {
  try {
    const raw = fs.readFileSync(GPU_PREFS_FILE, "utf8");
    return JSON.parse(raw).hardwareAcceleration !== false; // absent/corrupt -> default on
  } catch (e) {
    return true;
  }
}
if (!readGpuAccelerationPref()) {
  app.disableHardwareAcceleration();
}

ipcMain.handle("gpu:getPreference", () => readGpuAccelerationPref());
ipcMain.handle("gpu:setPreference", (event, enabled) => {
  try {
    fs.mkdirSync(path.dirname(GPU_PREFS_FILE), { recursive: true });
    fs.writeFileSync(GPU_PREFS_FILE, JSON.stringify({ hardwareAcceleration: !!enabled }), "utf8");
    return true;
  } catch (e) {
    return false;
  }
});
// The renderer calls this once the person confirms — the new preference
// only takes effect on the next launch (see the disableHardwareAcceleration
// call above, which only runs this early on startup), so relaunching is how
// "apply now" actually works from the Settings toggle.
ipcMain.handle("gpu:relaunch", () => {
  app.relaunch();
  app.exit(0);
});

// IPC handlers — the renderer never touches the filesystem directly. It
// calls window.storage.get/set/delete (exposed by preload.js), which sends
// one of these three messages and gets a Promise back. This mirrors the
// exact interface app.js already uses, so nothing about app.js changes
// between the web build and this one.
ipcMain.handle("storage:get", (event, key) => storage.get(key));
ipcMain.handle("storage:set", (event, key, value) => storage.set(key, value));
ipcMain.handle("storage:delete", (event, key) => storage.delete(key));

function createWindow() {
  const win = new BrowserWindow({
    width: 1500,
    height: 1020,
    minWidth: 1000,
    minHeight: 720,
    backgroundColor: "#14121f", // matches the app's own background — avoids a white flash on launch
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.loadFile(path.join(__dirname, "..", "app", "index.html"));

  // Anything the page tries to open as a new window (there isn't anything
  // currently, but if that ever changes) opens in the real browser instead
  // of a second Electron window.
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  return win;
}

function buildMenu() {
  const isMac = process.platform === "darwin";
  const template = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [{ role: "about" }, { type: "separator" }, { role: "hide" }, { role: "quit" }],
          },
        ]
      : []),
    {
      label: "Edit",
      submenu: [{ role: "undo" }, { role: "redo" }, { type: "separator" }, { role: "cut" }, { role: "copy" }, { role: "paste" }, { role: "selectAll" }],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    { role: "windowMenu" },
  ];
  return Menu.buildFromTemplate(template);
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(buildMenu());
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
