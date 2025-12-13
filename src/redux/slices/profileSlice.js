import { createSlice } from "@reduxjs/toolkit";
import { get, set } from "../../utils/persistData";
import { applyPregnancyWeekUpdate, calculateDueDate, getDueDateCountdown, shouldUpdatePregnancyWeek, updateStreak } from "../../utils/userCalculation";
import { formatISODate } from "../../utils/dateFormatter";

const STORAGE_KEY = "profile";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: get(STORAGE_KEY),
  },
  reducers: {
    saveProfile: (state, action) => {
      state.data = action.payload;

      // compute dueDate if not present
      if (state.data && !state.data.dueDate) {
        try {
          state.data.dueDate = calculateDueDate(state.data.registeredDate, state.data.registeredWeek);
          state.data.dueDateCountDown = getDueDateCountdown(state.data.dueDate);
        } catch (err) {
          console.log(err)
        }
      }
      set(STORAGE_KEY, state.data);
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

      set(STORAGE_KEY, state.data);
    },

    silentUpdatePregnancyWeek: (state) => {
      if (!state.data) return;
      if (!shouldUpdatePregnancyWeek(state.data)) return;

      state.data = applyPregnancyWeekUpdate(state.data);
      set(STORAGE_KEY, state.data);
    },
  },
});

export const { saveProfile, updateAfterCheckup, silentUpdatePregnancyWeek } =
  profileSlice.actions;

export default profileSlice.reducer;
