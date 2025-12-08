import { useCallback } from "react";
import usePersistedProfile from "./usePersistedProfile";
import { updateStreak } from "../utils/userUtils";
import { formatISODate } from "../utils/dateUtils";

export default function useCheckup() {
  const { profile, saveProfile } = usePersistedProfile();

  const applyCheckupCompletion = useCallback(() => {
    if (!profile) return;
    const today = formatISODate(new Date());
    const newStreak = updateStreak(profile.lastCheckupDate, profile.streak);

    saveProfile({
      ...profile,
      lastCheckupDate: today,
      streak: newStreak,
    });
  }, [profile, saveProfile]);

  return { profile, applyCheckupCompletion };
}
