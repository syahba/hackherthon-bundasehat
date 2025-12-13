// src/redux/slices/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { formatISODate } from "../../utils/dateFormatter";
import {
  updateStreak,
  applyPregnancyWeekUpdate,
  shouldUpdatePregnancyWeek,
  calculateDueDate,
} from "../../utils/userCalculation";

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
    data: loadFromStorage(),
  },
  reducers: {
    saveProfile: (state, action) => {
      // action.payload is the profile object
      state.data = action.payload;
      // compute dueDate if not present
      if (state.data && !state.data.dueDate) {
        try {
          state.data.dueDate = calculateDueDate(
            state.data.registeredDate,
            state.data.registeredWeek
          );
        } catch (err) {
          console.log(err)
        }
      }
      saveToStorage(state.data);
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
      saveToStorage(state.data);
    },
  },
});

export const { saveProfile, updateAfterCheckup, silentUpdatePregnancyWeek } =
  profileSlice.actions;

export default profileSlice.reducer;
