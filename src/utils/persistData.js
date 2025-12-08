// src/utils/persistence.js
export const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  merge(key, partial) {
    const existing = storage.get(key, {}) || {};
    const updated = { ...existing, ...partial };
    storage.set(key, updated);
    return updated;
  },
};
