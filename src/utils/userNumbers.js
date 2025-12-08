import { formatISODate } from "./dateUtils";

export function calculatePregnancyWeek(registeredWeek, registeredDate) {
  const now = new Date();
  const reg = new Date(registeredDate);
  const diffDays = Math.floor((now - reg) / (1000 * 60 * 60 * 24));

  const addedWeeks = Math.floor(diffDays / 7);
  return Math.max(0, registeredWeek + addedWeeks);
}

export function shouldUpdatePregnancyWeek(profile) {
  if (!profile) return false;
  const newWeek = calculatePregnancyWeek(profile.pregnancyWeekAtRegister, profile.registerDate);
  return newWeek !== profile.currentPregnancyWeek;
}

export function applyPregnancyWeekUpdate(profile) {
  const updatedWeek = calculatePregnancyWeek(profile.pregnancyWeekAtRegister, profile.registerDate);
  return {
    ...profile,
    currentPregnancyWeek: updatedWeek,
  };
}

export function updateStreak(lastCheckDate, currentStreak) {
  if (!lastCheckDate) return 1;
  const today = formatISODate(new Date());
  const yesterday = formatISODate(new Date(Date.now() - 86400000));

  if (lastCheckDate === today) return currentStreak;
  if (lastCheckDate === yesterday) return currentStreak + 1;
  return 1; // reset streak
}
