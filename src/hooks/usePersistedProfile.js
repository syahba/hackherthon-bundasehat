import { useState, useCallback, useLayoutEffect } from "react";

const STORAGE_KEY = "profile";

export default function usePersistedProfile() {
  const [profile, setProfile] = useState(null);

  useLayoutEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      setProfile(JSON.parse(saved));
    } catch {
      setProfile(null);
    }
  }, []);

  const saveProfile = useCallback((newProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    setProfile(newProfile);
  }, []);

  return { profile, saveProfile };
}
