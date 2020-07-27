import {NameSpace} from "../name-space.js";


const NAME_SPASE = NameSpace.APPLICATION;


const getActiveGenre = (state) => {
  return state[NAME_SPASE].genre;
};

const getActiveMovie = (state) => {
  return state[NAME_SPASE].activeMovie;
};

const getVisibleMoviesCount = (state) => {
  return state[NAME_SPASE].visibleMoviesCount;
};

const getActivePage = (state) => {
  return state[NAME_SPASE].activePage;
};

const getPrevPage = (state) => {
  return state[NAME_SPASE].prevPage;
};

const getPlayerStartTime = (state) => {
  return state[NAME_SPASE].playerStartTime;
};


export {
  getActiveGenre,
  getActiveMovie,
  getActivePage,
  getPlayerStartTime,
  getPrevPage,
  getVisibleMoviesCount,
};
