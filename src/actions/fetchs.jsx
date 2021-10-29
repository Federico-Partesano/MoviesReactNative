import axios from "axios";

import { updateUpcomingMovies } from "../reducer/setUpcomingMovie";
import { updatePopularMovies } from "../reducer/setPopularMovies";
import { updateDetailsMovie } from "../reducer/setDetailsMovie";
import { updatePopularSeriesTv } from "../reducer/setPopularSeriesTv";
import { updateTopRatedSeriesTv } from "../reducer/setTopRatedSeriesTv";

const url = "https://pokeapi.co/api/v2/";
const keyApi = "68ae5fab2a5639e3730ea5e55c5b867e";

export const fetchUpcomingMovies = () => {
  return async function (dispatch, getState) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${keyApi}&language=it&region=it&page=1`
    );

    dispatch(updateUpcomingMovies(response.data.results));
  };
};93740

export const fetchPopularMovies = () => {
  return async function (dispatch, getState) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${keyApi}&language=it&region=it&page=1`
    );

    dispatch(updatePopularMovies(response.data.results));
  };
};


export const fetchPopularSeriesTv = () => {
  return async function (dispatch, getState) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${keyApi}&language=it&region=it&page=1`
    );

    dispatch(updatePopularSeriesTv(response.data.results));
  };
};

export const fetchTopRatedSeriesTv = () => {
  return async function (dispatch, getState) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${keyApi}&language=it&region=it&page=1`
    );

    dispatch(updateTopRatedSeriesTv(response.data.results));
  
  };
};




// export const fetchDetailsMovie = (movie_id) => {
//   console.log("movie_id:", movie_id);
//   return async function (dispatch, getState) {
//     const response = await axios.get(
//       `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${keyApi}&language=en-US`
//     );

//     dispatch(updateDetailsMovie(response));
//   };
// };

// https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
