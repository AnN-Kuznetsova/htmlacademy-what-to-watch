import {ERROR_COLOR} from "../const";
import {
  extend,
  getFormatedDate,
  getFormatedRunTime,
  getFormatedScore,
  getParticipantsLine,
  getRatingDescription,
  getRandomArrayElements,
  disableForm,
  setErrorStyle,
} from "./utils";


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


  it(`Testing disableForm`, () => {
    const elements = [
      document.createElement(`input`),
      document.createElement(`button`),
    ];

    expect(elements[0].disabled).toEqual(false);
    expect(elements[0].style.opacity).toEqual(``);
    expect(elements[1].disabled).toEqual(false);
    expect(elements[1].style.opacity).toEqual(``);

    disableForm(elements);
    expect(elements[0].disabled).toEqual(true);
    expect(elements[0].style.opacity).toEqual(`0.5`);
    expect(elements[1].disabled).toEqual(true);
    expect(elements[1].style.opacity).toEqual(`0.5`);

    disableForm(elements, false);
    expect(elements[0].disabled).toEqual(false);
    expect(elements[0].style.opacity).toEqual(`1`);
    expect(elements[1].disabled).toEqual(false);
    expect(elements[1].style.opacity).toEqual(`1`);
  });


  it(`Testing setErrorStyle`, () => {
    const elements = [
      document.createElement(`input`),
      document.createElement(`button`),
    ];

    expect(elements[0].style.boxShadow).toEqual(``);
    expect(elements[1].style.boxShadow).toEqual(``);

    setErrorStyle(elements);
    expect(elements[0].style.boxShadow).toEqual(`0 0 0 1px ${ERROR_COLOR}`);
    expect(elements[1].style.boxShadow).toEqual(`0 0 0 1px ${ERROR_COLOR}`);

    setErrorStyle(elements, false);
    expect(elements[0].style.boxShadow).toEqual(`none`);
    expect(elements[1].style.boxShadow).toEqual(`none`);
  });
});
