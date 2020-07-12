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


export {
  getParticipantsLine,
  getRatingDescription,
  getFormatedRunTime,
  getFormattedScore,
};
