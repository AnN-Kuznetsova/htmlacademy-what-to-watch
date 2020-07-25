import {
  NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP,
  NUMBER_OF_CARDS_TO_INCREMENT,
  PageType,
} from "../../const";
import {extend} from "../../utils/utils";


const initialState = {
  genre: `All genres`,
  activeMovie: {},
  visibleMoviesCount: NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP,
  activePage: PageType.MAIN,
  prevPage: PageType.MAIN,
  playerStartTime: 0,
};


const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_ACTIVE_MOVIE: `CHANGE_ACTIVE_MOVIE`,
  CHANGE_ACTIVE_PAGE: `CHANGE_ACTIVE_PAGE`,
  INCREMENT_VISIBLE_MOVIES_COUNT: `INCREMENT_VISIBLE_MOVIES_COUNT`,
  RESET_VISIBLE_MOVIES_COUNT: `RESET_VISIBLE_MOVIES_COUNT`,
  SET_PLAYER_START_TIME: `SET_PLAYER_START_TIME`,
};

const ActionCreator = {
  changeGenre: (value) => ({
    type: ActionType.CHANGE_GENRE,
    payload: value,
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

  setPlayerStartTime: (currentTime) => ({
    type: ActionType.SET_PLAYER_START_TIME,
    payload: currentTime,
  }),
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload,
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

    case ActionType.SET_PLAYER_START_TIME:
      return extend(state, {
        playerStartTime: action.payload,
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
