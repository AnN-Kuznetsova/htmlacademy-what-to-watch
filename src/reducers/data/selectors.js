import {createSelector} from "reselect";

import {NameSpace} from "../name-space";
import {getActiveGenre, getActiveMovie} from "../application/selectors";


const NAME_SPASE = NameSpace.DATA;


const getMovies = (state) => {
  return state[NAME_SPASE].movies;
};

const getPromoMovie = (state) => {
  return state[NAME_SPASE].promoMovie;
};

const getFilteredMoviesByGenre = createSelector(
    getMovies,
    getActiveMovie,
    getActiveGenre,
    (movies, activeMovie, genre) => {
      return genre === `All genres` ? movies :
        movies.filter((movie) => movie.genres.includes(genre) && movie !== activeMovie);
    }
);


export {
  getMovies,
  getPromoMovie,
  getFilteredMoviesByGenre,
};
