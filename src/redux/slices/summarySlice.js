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
      if (!state.list) state.list = [];
      state.list.push(action.payload);
      set(STORAGE_KEY, state.list);
    },
  },
});

export const { addSummary, setLoading, setError } = summarySlice.actions;

// thunks
export const finishCheckup = (answers, profile) => async (dispatch) => {
  try {
    console.log(answers, profile)
    const summary = buildRecap(answers, profile);

    console.log(summary)
    dispatch(addSummary(summary));
    return dispatch(updateAfterCheckup());
  } catch (err) {
    console.log(err)
  }
};

export default summarySlice.reducer;
