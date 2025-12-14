import { useState, useCallback, useLayoutEffect } from "react";
import { get, set } from "../utils/persistData";

const STORAGE_KEY = "profile";

export default function usePersistedProfile() {
  const [profile, setProfile] = useState(null);

  useLayoutEffect(() => {
    const saved = get(STORAGE_KEY);
    if (!saved) return;
    try {
      setProfile(JSON.parse(saved));
    } catch {
      setProfile(null);
    }
  }, []);

  const saveProfile = useCallback((newProfile) => {
    set(STORAGE_KEY, newProfile)
    setProfile(newProfile);
  }, []);

  return { profile, saveProfile };
}
