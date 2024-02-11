import { createSlice } from "@reduxjs/toolkit";

const handTrackSlice = createSlice({
  name: "handTrack",
  initialState: {
    lmList: {},
    handedness: {},
  },
  reducers: {
    updateLmList: (state, action) => {
      state.lmList = action.payload;
    },
    updateHandedness: (state, action) => {
      state.handedness = action.payload;
    },
  },
});

export const selectHandTrack = (state) => state.handTrack;
export const { updateLmList, updateHandedness } = handTrackSlice.actions;
export default handTrackSlice.reducer;
