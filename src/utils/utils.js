import {VISIBLE_PARTICIPANTS_COUNT} from "../const";


const getParticipantsLine = (participants, visibleParticipantsCount = VISIBLE_PARTICIPANTS_COUNT) => {
  if (participants.length > visibleParticipantsCount) {
    return participants.slice(0, visibleParticipantsCount).join(`, `) + ` and other`;
  } else if (participants.length > 0) {
    return participants.slice().join(`, `);
  }
  return `Unknown`;
};


const getFormattedScore = (score) => {
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


const getFormatedMonth = (month) => {
  switch (month) {
    case 0:
      return `January`;
    case 1:
      return `February`;
    case 2:
      return `March`;
    case 3:
      return `April`;
    case 4:
      return `May`;
    case 5:
      return `June`;
    case 6:
      return `July`;
    case 7:
      return `August`;
    case 8:
      return `September`;
    case 9:
      return `October`;
    case 10:
      return `November`;
    case 11:
      return `December`;
    default:
      return ``;
  }
};


const getFormatedDate = (date, isForMachine = false) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthValue = getFormatedMonth(month);
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


const getExtremeIndexesForSlice = (arrayLength, iterationCount, iterationIndex) => {
  const beginingIndex = Math.ceil(arrayLength / iterationCount) * iterationIndex;
  const endingIndex = beginingIndex + Math.ceil(arrayLength / iterationCount);

  return {
    beginingIndex,
    endingIndex,
  };
};


export {
  getExtremeIndexesForSlice,
  getFormatedDate,
  getFormatedRunTime,
  getFormattedScore,
  getParticipantsLine,
  getRatingDescription,
};
