import {
  NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP,
  NUMBER_OF_CARDS_TO_INCREMENT,
  PageType,
  FilterType,
} from "../const";
import {
  extend,
  getFilteredMovies,
} from "../utils/utils";

import {movies} from "../mocks/movies";
import {promoMovie} from "../mocks/promo-movie";


const initialState = {
  movies,
  genre: `All genres`,
  movieList: movies,
  visibleMoviesCount: movies.length <= NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP ? movies.length :
    NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP,
  activeMovie: promoMovie,
  activePage: PageType.MAIN,
  prevPage: PageType.MAIN,
};


const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_MOVIES: `GET_MOVIES`,
  CHANGE_ACTIVE_MOVIE: `CHANGE_ACTIVE_MOVIE`,
  CHANGE_ACTIVE_PAGE: `CHANGE_ACTIVE_PAGE`,
  INCREMENT_VISIBLE_MOVIES_COUNT: `INCREMENT_VISIBLE_MOVIES_COUNT`,
  RESET_VISIBLE_MOVIES_COUNT: `RESET_VISIBLE_MOVIES_COUNT`,
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
  }),
  changeActivePage: (page) => ({
    type: ActionType.CHANGE_ACTIVE_PAGE,
    payload: page,
  }),
  incrementVisibleMoviesCount: () => ({
    type: ActionType.INCREMENT_VISIBLE_MOVIES_COUNT,
    payload: NUMBER_OF_CARDS_TO_INCREMENT,
  }),
  resetVisibleMoviesCount: () => ({
    type: ActionType.RESET_VISIBLE_MOVIES_COUNT,
    payload: null,
  }),
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

    case ActionType.CHANGE_ACTIVE_PAGE:
      if (state.activePage === action.payload) {
        return state;
      }
      return extend(state, {
        prevPage: state.activePage,
        activePage: action.payload,
      });

    case ActionType.INCREMENT_VISIBLE_MOVIES_COUNT:
      return extend(state, {
        visibleMoviesCount: state.visibleMoviesCount + action.payload,
      });

    case ActionType.RESET_VISIBLE_MOVIES_COUNT:
      return extend(state, {
        visibleMoviesCount: initialState.visibleMoviesCount,
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
