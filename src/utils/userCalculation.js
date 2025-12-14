import { formatISODate } from "./dateFormatter";

// count current pregnancy week
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

// calculate due date
export const calculateDueDate = (registeredDate, registeredWeek) => {
  const totalPregnancyDays = 280;
  const daysInWeek = 7;

  // calculate remaining pregnancy days
  const daysElapsed = (registeredWeek - 1) * daysInWeek;
  const remainingDays = totalPregnancyDays - daysElapsed;

  const regDate = new Date(registeredDate);

  const dueDate = new Date(regDate);
  dueDate.setDate(regDate.getDate() + remainingDays);

  const dueDateString = formatISODate(dueDate);
  return dueDateString;
};

export const getDueDateCountdown = (dueDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const timeDifference = due.getTime() - today.getTime();
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  // convert time difference to day
  const daysUntilDue = Math.ceil(timeDifference / MS_PER_DAY);

  if (daysUntilDue < 0) {
    return 0;
  }

  return daysUntilDue;
};

