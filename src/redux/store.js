import { configureStore } from "@reduxjs/toolkit";
import profile from "./slices/profileSlice";
import summaries from "./slices/summarySlice";

const store = configureStore({
  reducer: {
    profile,
    summaries,
  },
});

export default store;
