import { createSlice } from "@reduxjs/toolkit";
import { get, set } from "../../utils/persistData";
import { buildRecap } from "../../services/recapBuilder";
import { updateAfterCheckup } from "./profileSlice";

const STORAGE_KEY = "summaries";

const summarySlice = createSlice({
  name: "summaries",
  initialState: {
    list: get(STORAGE_KEY)
  },
  reducers: {
    addSummary: (state, action) => {
      state.list.push(action.payload);
      set(STORAGE_KEY, state.list);
    },
  },
});

export const { addSummary, setLoading, setError } = summarySlice.actions;

// thunks
export const finishCheckup = (answers, profile) => async (dispatch) => {
  try {
    const summary = buildRecap({ answers, userProfile: profile });

    dispatch(addSummary(summary));
    dispatch(updateAfterCheckup()); // streak + lastCheckupDate update

    return summary;
  } catch (err) {
    console.log(err)
  }
};

export default summarySlice.reducer;
