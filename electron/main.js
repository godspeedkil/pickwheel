const { app, BrowserWindow, ipcMain, Menu, shell } = require("electron");
const path = require("path");
const storage = require("./storage-main");

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
    width: 1280,
    height: 860,
    minWidth: 900,
    minHeight: 640,
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
