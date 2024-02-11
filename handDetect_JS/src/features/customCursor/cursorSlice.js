import { createSlice } from "@reduxjs/toolkit";

const cursorSlice = createSlice({
  name: "cursor",
  initialState: {
    isClicked: false,
  },
  reducers: {
    updateIsClicked: (state, action) => {
      state.isClicked = action.payload;
    },
  },
});

export const selectCursor = (state) => state.cursor;
export const { updateIsClicked } = cursorSlice.actions;
export default cursorSlice.reducer;
