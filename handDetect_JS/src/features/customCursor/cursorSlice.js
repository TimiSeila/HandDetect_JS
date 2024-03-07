import { createSlice } from "@reduxjs/toolkit";

const cursorSlice = createSlice({
  name: "cursor",
  initialState: {
    isClicked: false,
    cursorDistance: 0,
  },
  reducers: {
    updateIsClicked: (state, action) => {
      state.isClicked = action.payload;
    },
    updateCursorDistance: (state, action) => {
      state.cursorDistance = action.payload;
    },
  },
});

export const selectCursor = (state) => state.cursor;
export const { updateIsClicked, updateCursorDistance } = cursorSlice.actions;
export default cursorSlice.reducer;
