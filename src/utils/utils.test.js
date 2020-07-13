import {
  extend,
  getExtremeIndexesForSlice,
  getFilteredMovies,
  getFormatedDate,
  getFormatedRunTime,
  getFormatedScore,
  getParticipantsLine,
  getRatingDescription,
  getRandomArrayElements,
} from "./utils";

import {movies} from "../__test-data__/test-mocks";


const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;


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


  it(`Testing getFormatedScore`, () => {
    expect(getFormatedScore(1)).toEqual(`1,0`);
    expect(getFormatedScore(1.6)).toEqual(`1,6`);
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


  it(`Testing getFormatedRunTime`, () => {
    expect(getFormatedRunTime(0)).toEqual(`0h 0m`);
    expect(getFormatedRunTime(59)).toEqual(`0h 59m`);
    expect(getFormatedRunTime(60)).toEqual(`1h 0m`);
    expect(getFormatedRunTime(65)).toEqual(`1h 5m`);
    expect(getFormatedRunTime(105)).toEqual(`1h 45m`);
    expect(getFormatedRunTime(120)).toEqual(`2h 0m`);
    expect(getFormatedRunTime(157)).toEqual(`2h 37m`);
  });


  it(`Testing getFormatedDate`, () => {
    expect(getFormatedDate(new Date(2018, 11, 5))).toEqual(`December 5, 2018`);
    expect(getFormatedDate(new Date(2018, 11, 5), true)).toEqual(`2018-12-5`);
  });


  it(`Testing getExtremeIndexesForSlice`, () => {
    expect(getExtremeIndexesForSlice(7, 3, 0)).toEqual({
      beginingIndex: 0,
      endingIndex: 3,
    });
    expect(getExtremeIndexesForSlice(11, 3, 1)).toEqual({
      beginingIndex: 4,
      endingIndex: 8,
    });
    expect(getExtremeIndexesForSlice(5, 3, 2)).toEqual({
      beginingIndex: 4,
      endingIndex: 6,
    });
  });


  it(`Testing getRandomArrayElements`, () => {
    const array = [`one`, `two`, `three`, `four`, `five`];
    expect(getRandomArrayElements(array, 1)).toEqual([`three`]);
    expect(getRandomArrayElements(array, 2)).toEqual([`three`, `four`]);
    expect(getRandomArrayElements(array, 4)).toEqual([`three`, `four`, `two`, `five`]);
  });


  it(`"extend" should work correctly`, () => {
    const a = {
      property1: `property 1`,
      property2: `property 2`,
    };
    let b = {
      property3: `property 3`,
      property4: `property 4`,
    };
    expect(extend(a, b)).toEqual({
      property1: `property 1`,
      property2: `property 2`,
      property3: `property 3`,
      property4: `property 4`,
    });

    b = {
      property2: `property two`,
      property3: `property 3`,
    };
    expect(extend(a, b)).toEqual({
      property1: `property 1`,
      property2: `property two`,
      property3: `property 3`,
    });

    b = {
      property1: `property one`,
      property2: `property two`,
    };
    expect(extend(a, b)).toEqual({
      property1: `property one`,
      property2: `property two`,
    });

    b = {
      property1: `property one`,
    };
    expect(extend(a, b)).toEqual({
      property1: `property one`,
      property2: `property 2`,
    });
  });


  it(`Testing getFilteredMovies`, () => {
    expect(getFilteredMovies(movies, `genres`, `All genres`))
      .toEqual(movies);
    expect(getFilteredMovies(movies, `genres`, `Drama`))
      .toEqual([movies[0], movies[1], movies[2]]);
    expect(getFilteredMovies(movies, `genres`, `Adventure`))
      .toEqual([movies[2]]);
  });
});
