import {createSelector} from "reselect";

import {NameSpace} from "../name-space";
import {getActiveGenre, getActiveMovie} from "../application/selectors";
import {getRandomArrayElements} from "../../utils/utils";


const NAME_SPASE = NameSpace.DATA;


const getMovies = (state) => {
  return state[NAME_SPASE].movies;
};

const getPromoMovie = (state) => {
  return state[NAME_SPASE].promoMovie;
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

const getError = (state) => {
  return state[NAME_SPASE].dataError;
};


export {
  getError,
  getMovies,
  getPromoMovie,
  getFilteredMoviesByGenre,
};
