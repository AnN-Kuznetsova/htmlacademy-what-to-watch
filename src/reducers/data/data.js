import {extend} from "../../utils/utils";

import {ActionCreator as ApplicationActionCreator} from "../application/application";
import {PageType} from "../../const";
import {createMovies, createMovie} from "../../adapters/movie";


const initialState = {
  movies: [],
  promoMovie: {},
  maxMoviesCount: null,
  isError: false,
};


const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  SET_MAX_MOVIES_COUNT: `SET_MAX_MOVIES_COUNT`,
  SET_ERROR: `SET_ERROR`,
};


const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  }),

  loadPromoMovie: (movie) => ({
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: movie,
  }),

  setMaxMoviesCount: (count) => ({
    type: ActionType.SET_MAX_MOVIES_COUNT,
    payload: count,
  }),

  setError: () => ({
    type: ActionType.SET_ERROR,
    payload: true,
  }),
};


const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => createMovies(response.data))
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response));
      });
  },

  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => createMovie(response.data))
      .then((response) => {
        dispatch(ActionCreator.loadPromoMovie(response));
        dispatch(ApplicationActionCreator.changeActiveMovie(response));
        dispatch(ApplicationActionCreator.changeActivePage(PageType.MAIN));
      });
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });

    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        promoMovie: action.payload,
      });

    case ActionType.SET_MAX_MOVIES_COUNT:
      return extend(state, {
        maxMoviesCount: action.payload,
      });

    case ActionType.SET_ERROR:
      return extend(state, {
        isError: action.payload,
      });

    default:
      return state;
  }
};


export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
