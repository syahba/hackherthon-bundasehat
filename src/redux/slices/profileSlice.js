import { createSlice } from "@reduxjs/toolkit";
import { formatISODate } from "../../utils/dateUtils";
import { updateStreak } from "../../utils/userUtils";
import {
  applyPregnancyWeekUpdate,
  shouldUpdatePregnancyWeek,
} from "../../utils/userUtils";

const STORAGE_KEY = "profile";

const loadFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
};

const saveToStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: loadFromStorage(), // object or null
  },
  reducers: {
    saveProfile: (state, action) => {
      state.data = action.payload;
      saveToStorage(action.payload);
    },

    // called silently after checkup
    updateAfterCheckup: (state) => {
      if (!state.data) return;

      const today = formatISODate(new Date());
      const newStreak = updateStreak(
        state.data.lastCheckupDate,
        state.data.streak
      );

      state.data = {
        ...state.data,
        lastCheckupDate: today,
        streak: newStreak,
      };

      saveToStorage(state.data);
    },
    silentUpdatePregnancyWeek: (state) => {
      if (!state.data) return;
      if (!shouldUpdatePregnancyWeek(state.data)) return;

      state.data = applyPregnancyWeekUpdate(state.data);
      localStorage.setItem("profile", JSON.stringify(state.data));
    },
  },
});

export const { saveProfile, updateAfterCheckup, silentUpdatePregnancyWeek } =
  profileSlice.actions;

export default profileSlice.reducer;
