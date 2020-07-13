import {
  extend,
  getFilteredMovies,
} from "../utils/utils";

import {movies} from "../mocks/movies";
import {FilterType} from "../const";


const initialState = {
  movies,
  genre: `All genres`,
  movieList: movies,
};


const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_MOVIES: `GET_MOVIES`,
};

const ActionCreator = {
  changeGenre: (value) => ({
    type: ActionType.CHANGE_GENRE,
    payload: value,
  }),
  getMovies: () => ({
    type: ActionType.GET_MOVIES,
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
        movieList: getFilteredMovies(state.movies, FilterType.GENRE, state.genre),
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
