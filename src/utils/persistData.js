export const get = (key) => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
};

export const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const remove = (key) => {
  localStorage.removeItem(key);
};

export const merge = (key, partial) => {
  const existing = get(key, {}) || {};
  const updated = { ...existing, ...partial };
  set(key, updated);
  return updated;
};

export const summary = (key, value) => {
  const all = get();
  const filtered = all.filter((s) => s.date !== value.date);
  filtered.push(value);
  localStorage.setItem(key, JSON.stringify(filtered));
  return filtered;
}
