import {
  getRatingDescription,
  getLimitedNumberOfArrayElementsToString
} from "./utils.js";


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


  it(`Testing getRatingDescription`, () => {
    expect(getRatingDescription(0)).toEqual(`Bad`);
    expect(getRatingDescription(2.9)).toEqual(`Bad`);
    expect(getRatingDescription(3)).toEqual(`Normal`);
    expect(getRatingDescription(4.9)).toEqual(`Normal`);
    expect(getRatingDescription(5)).toEqual(`Good`);
    expect(getRatingDescription(7.9)).toEqual(`Good`);
    expect(getRatingDescription(8)).toEqual(`Very good`);
    expect(getRatingDescription(9.9)).toEqual(`Very good`);
    expect(getRatingDescription(10)).toEqual(`Awesome`);
  });
});
