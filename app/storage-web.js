/**
 * window.storage polyfill — backed by IndexedDB.
 *
 * This exists so app.js (which was originally written against the
 * window.storage.get/set/delete API provided inside Claude.ai artifacts)
 * can run completely unmodified outside of that environment: in a plain
 * browser, on GitHub Pages, or inside the Electron desktop build.
 *
 * Interface matches what app.js actually calls (verified against every
 * call site — .list() is intentionally not implemented, since app.js
 * never uses it):
 *
 *   await window.storage.get(key)            -> {key, value} | null
 *   await window.storage.set(key, value)      -> {key, value}
 *   await window.storage.delete(key)          -> {key, deleted: true}
 *
 * The `shared` parameter that Claude's version accepts is a no-op here —
 * app.js never passes it (everything it stores is personal, single-user
 * data), so there is nothing to branch on.
 *
 * Storage is per-origin, same as any IndexedDB use. In Electron this file
 * is NOT used — electron/storage-main.js replaces it with a file-based
 * backend so "portable mode" can keep data next to the .exe. See that
 * file's header comment for details.
 */
(function () {
  "use strict";

  const DB_NAME = "pickwheel-storage";
  const DB_VERSION = 1;
  const STORE = "kv";

  let dbPromise = null;

  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: "key" });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error("IndexedDB failed to open"));
    });
    return dbPromise;
  }

  async function getStore(mode) {
    const db = await openDB();
    return db.transaction(STORE, mode).objectStore(STORE);
  }

  function wrap(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("IndexedDB request failed"));
    });
  }

  window.storage = {
    async get(key) {
      const store = await getStore("readonly");
      const record = await wrap(store.get(key));
      if (!record) return null;
      return { key: record.key, value: record.value };
    },

    async set(key, value) {
      const store = await getStore("readwrite");
      await wrap(store.put({ key, value }));
      return { key, value };
    },

    async delete(key) {
      const store = await getStore("readwrite");
      await wrap(store.delete(key));
      return { key, deleted: true };
    },
  };
})();
