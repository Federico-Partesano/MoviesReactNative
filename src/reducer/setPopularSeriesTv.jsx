import { createSlice } from "@reduxjs/toolkit";

const popularSeriesTv = createSlice({
  name: "popularSeriesTv",
  initialState: [],
  reducers: {
    updatePopularSeriesTv: (state, action) => (state = action.payload),
  },
});

export const { updatePopularSeriesTv } = popularSeriesTv.actions;
export default popularSeriesTv.reducer;
