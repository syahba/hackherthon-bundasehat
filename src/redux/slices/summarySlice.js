import { createSlice } from "@reduxjs/toolkit";
import { buildSummary } from "../../services/summaryBuilder";
import { updateAfterCheckup } from "./profileSlice";

const STORAGE_KEY = "summaries";

const loadFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const saveToStorage = (list) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

const summarySlice = createSlice({
  name: "summaries",
  initialState: {
    list: loadFromStorage(), // array of summaries
    loading: "idle",
    error: null,
  },
  reducers: {
    addSummary: (state, action) => {
      state.list.push(action.payload);
      saveToStorage(state.list);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = "failed";
    },
  },
});

export const { addSummary, setLoading, setError } = summarySlice.actions;

export const finishCheckupThunk = (answers, profile) => async (dispatch) => {
  try {
    dispatch(setLoading("pending"));
    dispatch(setError(null));

    // generates the summary object based on your specification
    const summary = buildSummary({ answers, userProfile: profile });

    dispatch(addSummary(summary));
    dispatch(updateAfterCheckup()); // streak + lastCheckupDate update

    dispatch(setLoading("succeeded"));
    return summary;
  } catch (err) {
    dispatch(setError("Failed to generate summary"));
    throw err;
  }
};

export default summarySlice.reducer;
