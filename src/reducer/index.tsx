import { combineReducers } from "redux";
import upComingMovies from "./setUpcomingMovie";
import detailsMovie from "./setDetailsMovie";
import popularMovies from "./setPopularMovies";
export type RootState = ReturnType<typeof rootReducer>;
// accetta un oggetto con coppia chiave valore, però esiste una abbreviazione, mettendo solo la funzione, la chiave automaticamente è il nome della
// funzione
// E' come se scrivessi
// const rootReducer = combineReducers({
//     cunter: reducerCounter,
//     logged: loginReducer,
//   });

const rootReducer = combineReducers({
  // loginReducer,
  detailsMovie,
  upComingMovies,
  popularMovies,
});

export default rootReducer;
