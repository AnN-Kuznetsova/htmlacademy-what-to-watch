import {createSelector} from "reselect";

import {NameSpace} from "../name-space";
import {getActiveGenre, getActiveMovie} from "../application/selectors";
import {getRandomArrayElements} from "../../utils/utils";


const NAME_SPASE = NameSpace.DATA;


const getMovies = (state) => {
  return state[NAME_SPASE].movies;
};

const getMovieById = createSelector(
    getMovies,
    (state, id) => id,
    (movies, id) => movies.find((movie) => movie.id === id)
);

const getPromoMovie = (state) => {
  return state[NAME_SPASE].promoMovie;
};

const getActiveMovieReviews = (state) => {
  return state[NAME_SPASE].activeMovieReviews;
};

const getMaxMoviesCount = (state) => {
  return state[NAME_SPASE].maxMoviesCount;
};

const getFilteredMoviesByGenre = createSelector(
    getMovies,
    getActiveMovie,
    getActiveGenre,
    getMaxMoviesCount,
    (movies, activeMovie, genre, moviesCount) => {
      const filteredMovies = genre === `All genres` ? movies :
        movies.filter((movie) => movie.genres.includes(genre) && movie !== activeMovie);

      return moviesCount ? getRandomArrayElements(filteredMovies, moviesCount) :
        filteredMovies;
    }
);

const getDataError = (state) => {
  return state[NAME_SPASE].dataError;
};


export {
  getActiveMovieReviews,
  getDataError,
  getMovieById,
  getMovies,
  getPromoMovie,
  getFilteredMoviesByGenre,
};
