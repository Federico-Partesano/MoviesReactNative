import { createSlice } from "@reduxjs/toolkit";

const detailsMovie = createSlice({
  name: "detailsMovie",
  initialState: [],
  reducers: {
    updateDetailsMovie: (state, action) => (state = action.payload),
  },
});

export const { updateDetailsMovie } = detailsMovie.actions;
export default detailsMovie.reducer;
