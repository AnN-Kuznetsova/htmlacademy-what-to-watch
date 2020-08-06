import {extend, disableForm, setErrorStyle} from "../../utils/utils";

import {ActionCreator as ApplicationActionCreator} from "../application/application";
import {PageType, AppRoute} from "../../const";
import {createReviews} from "../../adapters/review";
import {createMovies, createMovie} from "../../adapters/movie";
import {getActiveMovie} from "../application/selectors";
import {history} from "../../history";


const TIME_FOR_ERROR = 500;

const initialState = {
  movies: null,
  promoMovie: null,
  favoriteMovies: null,
  maxMoviesCount: null,
  activeMovieReviews: [],
  dataError: null,
};


const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_FAVORITE_MOVIES: `LOAD_FAVORITE_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  LOAD_ACTIVE_MOVIE_REVIEWS: `LOAD_ACTIVE_MOVIE_REVIEWS`,
  CHANGE_MOVIE: `CHANGE_MOVIE`,
  SET_MAX_MOVIES_COUNT: `SET_MAX_MOVIES_COUNT`,
  SET_DATA_ERROR: `SET_DATA_ERROR`,
};


const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  }),

  loadFavoriteMovies: (movies) => ({
    type: ActionType.LOAD_FAVORITE_MOVIES,
    payload: movies,
  }),

  loadPromoMovie: (movie) => ({
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: movie,
  }),

  loadActiveMovieReviews: (comments) => ({
    type: ActionType.LOAD_ACTIVE_MOVIE_REVIEWS,
    payload: comments,
  }),

  changeMovie: (movie) => ({
    type: ActionType.CHANGE_MOVIE,
    payload: movie,
  }),

  setMaxMoviesCount: (count) => ({
    type: ActionType.SET_MAX_MOVIES_COUNT,
    payload: count,
  }),

  setDataError: (error) => ({
    type: ActionType.SET_DATA_ERROR,
    payload: error,
  }),
};


const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => createMovies(response.data))
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response));
      })
      .catch((error) => {
        dispatch(ActionCreator.setDataError(error));
      });
  },

  loadFavoriteMovies: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => createMovies(response.data))
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteMovies(response));
      })
      .catch((error) => {
        dispatch(ActionCreator.setDataError(error));
      });
  },

  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => createMovie(response.data))
      .then((response) => {
        dispatch(ActionCreator.loadPromoMovie(response));
        dispatch(ApplicationActionCreator.changeActiveMovie(response));
        dispatch(ApplicationActionCreator.changeActivePage(PageType.MAIN));
      })
      .catch((error) => {
        dispatch(ActionCreator.setDataError(error));
      });
  },

  loadActiveMovieReviews: (activeMovieId) => (dispatch, getState, api) => {
    return api.get(`/comments1/${activeMovieId}`)
      .then((response) => createReviews(response.data))
      .then((response) => {
        dispatch(ActionCreator.loadActiveMovieReviews(response));
        dispatch(ActionCreator.setDataError(null));
      });
  },

  sendReview: (reviewData) => (dispatch, getState, api) => {
    disableForm(reviewData.addReviewFormElements);

    return api.post(`/comments/${reviewData.movieId}`, {
      rating: reviewData.rating,
      comment: reviewData.comment,
    })
    .then((response) => createReviews(response.data))
    .then((response) => {
      history.push(AppRoute.FILM.replace(`:id`, getActiveMovie(getState()).id));
      dispatch(ApplicationActionCreator.changeActivePage(PageType.MOVIE_DETAILS));
      disableForm(reviewData.addReviewFormElements, false);
      dispatch(ActionCreator.loadActiveMovieReviews(response));
      dispatch(ActionCreator.setDataError(null));
    })
    .catch((error) => {
      disableForm(reviewData.addReviewFormElements, false);
      dispatch(ActionCreator.setDataError(error));
    });
  },

  changeMovie: (newMovieData, changeMovieFormElements) => (dispatch, getState, api) => {
    disableForm(changeMovieFormElements);

    return api.post(`/favorite/${newMovieData.id}/${newMovieData.status}`)
      .then((response) => createMovie(response.data))
      .then((response) => {
        dispatch(ActionCreator.changeMovie(response));
        disableForm(changeMovieFormElements, false);
      })
      .catch(() => {
        setErrorStyle(changeMovieFormElements);
        setTimeout(() => {
          setErrorStyle(changeMovieFormElements, false);
        }, TIME_FOR_ERROR);
        disableForm(changeMovieFormElements, false);
      });
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });

    case ActionType.LOAD_FAVORITE_MOVIES:
      return extend(state, {
        favoriteMovies: action.payload,
      });

    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        promoMovie: action.payload,
      });

    case ActionType.LOAD_ACTIVE_MOVIE_REVIEWS:
      return extend(state, {
        activeMovieReviews: action.payload,
      });

    case ActionType.SET_MAX_MOVIES_COUNT:
      return extend(state, {
        maxMoviesCount: action.payload,
      });

    case ActionType.SET_DATA_ERROR:
      return extend(state, {
        dataError: action.payload,
      });

    case ActionType.CHANGE_MOVIE: {
      const newMovie = action.payload;
      const movieIndex = state.movies.findIndex((movie) => movie.id === newMovie.id);

      if (movieIndex === -1) {
        return state;
      }

      return extend(state, {
        movies: [].concat(state.movies.slice(0, movieIndex), [newMovie], state.movies.slice(movieIndex + 1)),
        promoMovie: newMovie.id === state.promoMovie.id
          ? newMovie
          : state.promoMovie,
      });
    }

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
