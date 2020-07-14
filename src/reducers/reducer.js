import {
  extend,
  getFilteredMovies,
} from "../utils/utils";

import {FilterType} from "../const";

import {movies} from "../mocks/movies";
import {promoMovie} from "../mocks/promo-movie";


const initialState = {
  movies,
  genre: `All genres`,
  movieList: movies,
  activeMovie: promoMovie,
};


const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_MOVIES: `GET_MOVIES`,
  CHANGE_ACTIVE_MOVIE: `CHANGE_ACTIVE_MOVIE`,
};

const ActionCreator = {
  changeGenre: (value) => ({
    type: ActionType.CHANGE_GENRE,
    payload: value,
  }),
  getMovies: (moviesCount = null) => ({
    type: ActionType.GET_MOVIES,
    payload: moviesCount,
  }),
  changeActiveMovie: (movie) => ({
    type: ActionType.CHANGE_ACTIVE_MOVIE,
    payload: movie,
  })
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload,
      });

    case ActionType.GET_MOVIES:
      return extend(state, {
        movieList: getFilteredMovies(state.movies, FilterType.GENRE, state.genre, state.activeMovie, action.payload),
      });

    case ActionType.CHANGE_ACTIVE_MOVIE:
      return extend(state, {
        activeMovie: action.payload,
      });

    default:
      return state;
  }
};


export {
  ActionCreator,
  ActionType,
  reducer,
};
