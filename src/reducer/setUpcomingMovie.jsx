import { createSlice } from "@reduxjs/toolkit";

const upComingMovies = createSlice({
  name: "upComingMovies",
  initialState: [],
  reducers: {
    updateUpcomingMovies: (state, action) => (state = action.payload),
  },
});

export const { updateUpcomingMovies } = upComingMovies.actions;
export default upComingMovies.reducer;
