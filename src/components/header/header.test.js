import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header";


global.window = Object.create(window);


describe(`Render Header`, () => {
  it(`Should match with snapshot when window.location is MainPage`, () => {
    Object.defineProperty(window, `location`, {
      value: {
        pathname: `/`
      }
    });

    const headerSnapshot = renderer.create(
        <Header />
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when window.location is not MainPage`, () => {
    window.location.pathname = `/page-name`;

    const headerSnapshot = renderer.create(
        <Header />
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });
});
