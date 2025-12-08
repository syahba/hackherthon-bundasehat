import { useEffect } from "react";
import usePersistedProfile from "./usePersistedProfile";
import {
  shouldUpdatePregnancyWeek,
  applyPregnancyWeekUpdate,
} from "../utils/userCalculation";

export default function usePregnancyProgress() {
  const { profile, saveProfile } = usePersistedProfile();

  useEffect(() => {
    if (!profile) return;
    if (!shouldUpdatePregnancyWeek(profile)) return;

    const updated = applyPregnancyWeekUpdate(profile);
    saveProfile(updated); // saved only when changed
  }, [profile, saveProfile]);

  return profile; // for home screen consumption
}
