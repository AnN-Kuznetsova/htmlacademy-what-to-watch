const getStringFromLimitedNumbersOfArrayElements = (array, elementsCount = array.length, beginningOfLine = ``, endOfLine = ``) => {
  if (array.length === 0) {
    return ``;
  }

  if (array.length <= elementsCount) {
    endOfLine = ``;
  }

  return beginningOfLine
          + array.slice(0, elementsCount)
                 .reduce((accumulator, arrayItem) => `${accumulator}, ${arrayItem}`)
          + endOfLine;
};


const getFormattedScore = (score) => {
  if (score - Math.floor(score) !== 0) {
    return score.toString().replace(`.`, `,`);
  }

  return `${score.toString()},0`;
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
  getStringFromLimitedNumbersOfArrayElements,
  getRatingDescription,
  getFormattedScore,
};
