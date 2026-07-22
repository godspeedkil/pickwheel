/**
 * Preload script — runs in the renderer, before app/index.html's own
 * scripts, with access to a limited, sandboxed Node environment.
 *
 * This is the ONLY bridge between the page and anything privileged. It
 * exposes exactly three functions — get/set/delete — matching the same
 * window.storage interface app.js already expects. Nothing else (no raw
 * fs, no ipcRenderer, no Node globals) is ever exposed to the page.
 *
 * Because window.storage already exists by the time app/storage-web.js's
 * own script runs, that file's IIFE detects it and skips defining its
 * IndexedDB version — so app/index.html works unmodified in both the
 * browser and here.
 */

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("storage", {
  get: (key) => ipcRenderer.invoke("storage:get", key),
  set: (key, value) => ipcRenderer.invoke("storage:set", key, value),
  delete: (key) => ipcRenderer.invoke("storage:delete", key),
});

// Desktop-only: lets Settings show a "hardware acceleration" toggle and act
// on it. Not present in the web build at all (there's no Electron main
// process to configure — the browser owns that decision on its own), which
// is also how app.js knows whether to show the control in the first place.
contextBridge.exposeInMainWorld("pickwheelGpu", {
  getPreference: () => ipcRenderer.invoke("gpu:getPreference"),
  setPreference: (enabled) => ipcRenderer.invoke("gpu:setPreference", enabled),
  relaunch: () => ipcRenderer.invoke("gpu:relaunch"),
});
