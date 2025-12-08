export function formatISODate(d) {
  const iso = new Date(d).toISOString();
  return iso.slice(0, 10);
}

export function getTrimesterFromWeek(week) {
  if (!week && week !== 0) return 2;
  if (week <= 13) return 1;
  if (week <= 27) return 2;
  return 3;
}

export function daysBetween(d1, d2) {
  const t1 = new Date(d1).setHours(0, 0, 0, 0);
  const t2 = new Date(d2).setHours(0, 0, 0, 0);
  return Math.floor((t2 - t1) / (1000 * 60 * 60 * 24));
}

export function isToday(dateStr) {
  return formatISODate(Date.now()) === formatISODate(dateStr);
}

export function addDays(dateStr, days) {
  const base = new Date(dateStr);
  base.setDate(base.getDate() + days);
  return formatISODate(base);
}
