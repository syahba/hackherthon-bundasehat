import { createSlice } from "@reduxjs/toolkit";
import { get, set } from "../../utils/persistData";
import {
  applyPregnancyWeekUpdate,
  shouldUpdatePregnancyWeek,
  updateStreak,
} from "../../utils/userCalculation";
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
    },
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

export const storeProfile = (profile) => async (dispatch) => {
  try {
    set(STORAGE_KEY, profile);
    return dispatch(saveProfile(profile));
  } catch (err) {
    console.log(err);
  }
};

export default profileSlice.reducer;
