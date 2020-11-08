const NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP = 8;
const NUMBER_OF_CARDS_TO_INCREMENT = 8;
const MAX_FILTER_ELEMENTS_COUNT = 10;
const NUMBER_OF_SIMILAR_FILMS = 4;
const VISIBLE_PARTICIPANTS_COUNT = 4;
const DELAY_PLAYBACK_PREVIEW = 1000;
const MIN_REVIEW_TEXT_LENGTH = 50;
const MAX_REVIEW_TEXT_LENGTH = 400;
const RATING_RANGE = 5;
const ERROR_COLOR = `#a8421e`;


const AppRoute = {
  MAIN: `/htmlacademy-what-to-watch/`,
  SIGN_IN: `/htmlacademy-what-to-watch/login`,
  MY_LIST: `/htmlacademy-what-to-watch/myList`,
  FILM: `/htmlacademy-what-to-watch/films/:id`,
  ADD_REVIEW: `/htmlacademy-what-to-watch/films/:id/review`,
  PLAYER: `/htmlacademy-what-to-watch/player/:id`,
};


export {
  DELAY_PLAYBACK_PREVIEW,
  ERROR_COLOR,
  MAX_FILTER_ELEMENTS_COUNT,
  MAX_REVIEW_TEXT_LENGTH,
  MIN_REVIEW_TEXT_LENGTH,
  NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP,
  NUMBER_OF_CARDS_TO_INCREMENT,
  NUMBER_OF_SIMILAR_FILMS,
  RATING_RANGE,
  VISIBLE_PARTICIPANTS_COUNT,
  AppRoute,
};
