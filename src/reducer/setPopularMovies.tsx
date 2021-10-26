import { createSlice } from "@reduxjs/toolkit";

const popularMovies = createSlice({
  name: "popularMovies",
  initialState: [],
  reducers: {
    updatePopularMovies: (state, action) => (state = action.payload),
  },
});

export const { updatePopularMovies } = popularMovies.actions;
export default popularMovies.reducer;
