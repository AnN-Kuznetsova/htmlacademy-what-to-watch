const getLimitedNumberOfArrayElementsToString = (array, elementsCount = array.length, beginningOfLine = ``, endOfLine = ``) => {
  if (array.length === 0) {
    return ``;
  }

  let line = beginningOfLine + array[0];

  if (array.length > 1) {
    for (let i = 1; i < elementsCount; i++) {
      if (array[i]) {
        line += `, ${array[i]}`;
      } else {
        break;
      }
    }
  }

  if (array.length > elementsCount) {
    line += endOfLine;
  }

  return line;
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
  getLimitedNumberOfArrayElementsToString,
  getRatingDescription,
};
