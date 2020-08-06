import {createSelector} from "reselect";

import {NameSpace} from "../name-space";
import {PageType} from "../../const";
import {getActiveGenre, getActiveMovie, getActivePage} from "../application/selectors";
import {getRandomArrayElements} from "../../utils/utils";


const NAME_SPASE = NameSpace.DATA;


const getMovies = (state) => {
  return state[NAME_SPASE].movies;
};

const getFavoriteMovies = (state) => {
  return state[NAME_SPASE].favoriteMovies;
};

const getMovieById = createSelector(
    getMovies,
    (state, id) => id,
    (movies, id) => {
      return movies
        ? movies.find((movie) => movie.id === id)
        : null;
    }
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

const getMoviesForCatalog = createSelector(
    getActivePage,
    getFilteredMoviesByGenre,
    getFavoriteMovies,
    (page, filteredMovies, favoriteMovies) => {
      return page === PageType.MY_LIST
        ? favoriteMovies
        : filteredMovies;
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
  getMoviesForCatalog,
};
