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
  visibleSmallCardCount: movies.length <= NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP ? movies.length :
    NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP,
  activeMovie: promoMovie,
  activePage: PageType.MAIN,
};


const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_MOVIES: `GET_MOVIES`,
  CHANGE_ACTIVE_MOVIE: `CHANGE_ACTIVE_MOVIE`,
  CHANGE_ACTIVE_PAGE: `CHANGE_ACTIVE_PAGE`,
  INCREMENT_VISIBLE_SMALL_CARD_COUNT: `INCREMENT_VISIBLE_SMALL_CARD_COUNT`,
  RESET_VISIBLE_SMALL_CARD_COUNT: `RESET_VISIBLE_SMALL_CARD_COUNT`,
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
  incrementVisibleSmallCardCount: () => ({
    type: ActionType.INCREMENT_VISIBLE_SMALL_CARD_COUNT,
    payload: NUMBER_OF_CARDS_TO_INCREMENT,
  }),
  resetVisibleSmallCardCount: () => ({
    type: ActionType.RESET_VISIBLE_SMALL_CARD_COUNT,
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
      return extend(state, {
        activePage: action.payload,
      });

    case ActionType.INCREMENT_VISIBLE_SMALL_CARD_COUNT:
      return extend(state, {
        visibleSmallCardCount: state.visibleSmallCardCount + action.payload,
      });

    case ActionType.RESET_VISIBLE_SMALL_CARD_COUNT:
      return extend(state, {
        visibleSmallCardCount: initialState.visibleSmallCardCount,
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
