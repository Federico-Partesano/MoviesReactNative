import { createSlice } from "@reduxjs/toolkit";

const topRatedSeriesTv = createSlice({
  name: "topRatedSeriesTv",
  initialState: [],
  reducers: {
    updateTopRatedSeriesTv: (state, action) => (state = action.payload),
  },
});

export const { updateTopRatedSeriesTv } = topRatedSeriesTv.actions;
export default topRatedSeriesTv.reducer;
