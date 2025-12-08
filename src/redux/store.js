import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import summaryReducer from "./slices/summarySlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    summaries: summaryReducer,
  },
});

export default store;
