import {
  getParticipantsLine,
  getFormattedScore,
  getRatingDescription,
} from "./utils.js";


describe(`Utils tests`, () => {
  it(`Testing getParticipantsLine`, () => {
    const array = [
      `first`,
      `second`,
      `third`,
      `fourth`,
      `fifth`,
    ];

    expect(getParticipantsLine([]))
      .toEqual(`Unknown`);
    expect(getParticipantsLine(array, 1))
      .toEqual(`first and other`);
    expect(getParticipantsLine(array, 3))
      .toEqual(`first, second, third and other`);
    expect(getParticipantsLine(array, 7))
      .toEqual(`first, second, third, fourth, fifth`);
  });


  it(`Testing getFormattedScore`, () => {
    expect(getFormattedScore(1)).toEqual(`1,0`);
    expect(getFormattedScore(1.6)).toEqual(`1,6`);
  });


  it(`Testing getRatingDescription`, () => {
    expect(getRatingDescription()).toEqual(``);
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
