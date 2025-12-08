const KEY = "dailySummaries";

export function loadSummaries() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSummary(summary) {
  const all = loadSummaries();
  const filtered = all.filter((s) => s.date !== summary.date);
  filtered.push(summary);
  localStorage.setItem(KEY, JSON.stringify(filtered));
  return filtered;
}

export function clearSummaries() {
  localStorage.removeItem(KEY);
}
