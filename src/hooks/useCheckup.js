import { useCallback } from "react";
import usePersistedProfile from "./usePersistedProfile";
import {
  calculateDueDate,
  getDueDateCountdown,
  updateStreak,
} from "../utils/userCalculation";
import { formatISODate } from "../utils/dateFormatter";

export default function useCheckup() {
  const { profile, saveProfile } = usePersistedProfile();

  const registerCheckupCompletion = useCallback(() => {
    if (!profile) return;

    const today = formatISODate(new Date());
    const newStreak = updateStreak(profile.lastCheckupDate, profile.streak);
    const dueDate = calculateDueDate(
      profile.registredDate,
      profile.registeredWeek
    );
    const dueDateCountDown = getDueDateCountdown(dueDate);

    saveProfile({
      ...profile,
      lastCheckupDate: today,
      streak: newStreak,
      dueDateCountDown,
    });
  }, [profile, saveProfile]);

  return { profile, registerCheckupCompletion };
}
