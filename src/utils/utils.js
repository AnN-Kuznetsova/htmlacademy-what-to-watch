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


export {
  getLimitedNumberOfArrayElementsToString,
};
