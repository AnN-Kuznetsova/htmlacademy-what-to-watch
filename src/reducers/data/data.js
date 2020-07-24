import {extend} from "../../utils/utils";


const initialState = {
  movies: [],
  promoMovie: {},
};


const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
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

    default:
      return state;
  }
};


export {
  ActionCreator,
  ActionType,
  reducer,
};
