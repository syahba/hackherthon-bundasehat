import { formatISODate } from "./dateUtils";

export function calculatePregnancyWeek(registeredWeek, registeredDate) {
  const now = new Date();
  const reg = new Date(registeredDate);
  const diffDays = Math.floor((now - reg) / (1000 * 60 * 60 * 24));
  const addedWeeks = Math.floor(diffDays / 7);
  return Math.max(0, registeredWeek + addedWeeks);
}

// detect if the pregnancy week should update (on app open)
export function shouldUpdatePregnancyWeek(profile) {
  if (!profile) return false;
  const newWeek = calculatePregnancyWeek(profile.registeredWeek, profile.registeredDate);
  return newWeek !== profile.currentWeek;
}

// return updated profile object with currentWeek refreshed
export function applyPregnancyWeekUpdate(profile) {
  return {
    ...profile,
    currentWeek: calculatePregnancyWeek(profile.registeredWeek, profile.registeredDate),
  };
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
