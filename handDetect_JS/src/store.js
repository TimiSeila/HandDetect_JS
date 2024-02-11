import { configureStore } from "@reduxjs/toolkit";

import handTrackSlice from "./features/HandTrack/handTrackSlice";
import cursorSlice from "./features/customCursor/cursorSlice";

const store = configureStore({
  reducer: {
    handTrack: handTrackSlice,
    cursor: cursorSlice,
  },
});

export default store;
