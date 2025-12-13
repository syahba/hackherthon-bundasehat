import { formatISODate } from "./dateFormatter";

export function calculatePregnancyWeek(registeredWeek, registeredDate) {
  const now = new Date();
  const reg = new Date(registeredDate);
  const diffDays = Math.floor((now - reg) / (1000 * 60 * 60 * 24));
  const addedWeeks = Math.floor(diffDays / 7);
  return Math.max(0, registeredWeek + addedWeeks);
}

// streak logic
export function updateStreak(lastCheckDate, currentStreak) {
  if (!lastCheckDate) return 1;

  const today = formatISODate(new Date());
  const yesterday = formatISODate(new Date(Date.now() - 86400000));

  if (lastCheckDate === today) return currentStreak;
  if (lastCheckDate === yesterday) return (currentStreak || 0) + 1;
  return 1;
}
