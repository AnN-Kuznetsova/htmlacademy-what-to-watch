import {extend} from "../../utils/utils";

import {createMovies, createMovie} from "../../adapters/movie";
import {ActionCreator as ApplicationActionCreator} from "../application/application";


const initialState = {
  movies: [],
  promoMovie: {},
  maxMoviesCount: null,
};


const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  SET_MAX_MOVIES_COUNT: `SET_MAX_MOVIES_COUNT`,
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
};


const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => createMovies(response.data))
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response));
        return true;
      });
  },

  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => createMovie(response.data))
      .then((response) => {
        dispatch(ActionCreator.loadPromoMovie(response));
        dispatch(ApplicationActionCreator.changeActiveMovie(response));
        return true;
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
