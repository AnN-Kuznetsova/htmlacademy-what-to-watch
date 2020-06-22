import {getLimitedNumberOfArrayElementsToString} from "./utils.js";


describe(`Utils tests`, () => {
  it(`Testing getLimitedNumberOfArrayElementsToString`, () => {
    const array = [
      `first `,
      `second `,
      `third `,
      `fourth `,
      `fifth`,
    ];

    expect(getLimitedNumberOfArrayElementsToString([]))
      .toEqual(``);
    expect(getLimitedNumberOfArrayElementsToString(array, 1, ``, ``))
      .toEqual(array[0]);
    expect(getLimitedNumberOfArrayElementsToString(array, 3))
      .toEqual(`${array[0]}, ${array[1]}, ${array[2]}`);
    expect(getLimitedNumberOfArrayElementsToString(array, 3, `Begin: `, ` end...`))
      .toEqual(`Begin: ${array[0]}, ${array[1]}, ${array[2]} end...`);
    expect(getLimitedNumberOfArrayElementsToString(array, 7, `Begin: `, ` end...`))
      .toEqual(`Begin: ${array[0]}, ${array[1]}, ${array[2]}, ${array[3]}, ${array[4]}`);
  });
});
