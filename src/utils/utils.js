import {VISIBLE_PARTICIPANTS_COUNT, FilterType} from "../const";


const months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];


const getRandomIntegerNumber = function (num) {
  return Math.floor(Math.random() * (num + 1));
};


const getRandomArrayElements = function (array, count) {
  const arrayElements = [];
  const arrayCopy = array.slice();

  for (let i = 0; i < count; i++) {
    const index = getRandomIntegerNumber(arrayCopy.length - 1);
    arrayElements.push(...arrayCopy.splice(index, 1));
  }

  return arrayElements;
};


const extend = (a, b) => {
  return Object.assign({}, a, b);
};


const getParticipantsLine = (participants, visibleParticipantsCount = VISIBLE_PARTICIPANTS_COUNT) => {
  if (participants.length > visibleParticipantsCount) {
    return participants.slice(0, visibleParticipantsCount).join(`, `) + ` and other`;
  } else if (participants.length > 0) {
    return participants.slice().join(`, `);
  }
  return `Unknown`;
};


const getFormatedScore = (score) => {
  if (score - Math.floor(score) !== 0) {
    return score.toString().replace(`.`, `,`);
  }
  return `${score.toString()},0`;
};


const getFormatedRunTime = (runTime) => {
  const hours = Math.floor(runTime / 60);
  const minutes = runTime - hours * 60;
  return `${hours}h ${minutes}m`;
};


const getFormatedDate = (date, isForMachine = false) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthValue = months[month];
  const day = date.getDate();

  return isForMachine ? `${year}-${month + 1}-${day}` :
    `${monthValue} ${day}, ${year}`;
};


const getRatingDescription = (score) => {
  switch (true) {
    case (score < 3):
      return `Bad`;
    case (score >= 3 && score < 5):
      return `Normal`;
    case (score >= 5 && score < 8):
      return `Good`;
    case (score >= 8 && score < 10):
      return `Very good`;
    case (score === 10):
      return `Awesome`;
    default:
      return ``;
  }
};


const getFilteredMovies = (movies, filterName, filterValue, currentMovie, moviesCount = null) => {
  let filteredMovies = null;

  switch (filterName) {
    case FilterType.GENRE:
      filteredMovies = filterValue === `All genres` ? movies :
        movies.filter((movie) => movie.genres.includes(filterValue) && movie !== currentMovie);
      break;
    default:
      filteredMovies = movies;
      break;
  }

  return moviesCount ? getRandomArrayElements(filteredMovies, moviesCount) :
    filteredMovies;
};


export {
  extend,
  //getFilteredMovies,
  getFormatedDate,
  getFormatedRunTime,
  getFormatedScore,
  getParticipantsLine,
  getRatingDescription,
  getRandomArrayElements,
};
