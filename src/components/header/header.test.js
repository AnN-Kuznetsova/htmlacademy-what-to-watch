import React from "react";
import renderer from "react-test-renderer";

import {Header, HeaderMode} from "./header";


global.window = Object.create(window);


describe(`Render Header`, () => {
  it(`Should match with snapshot when window.location is MainPage`, () => {
    Object.defineProperty(window, `location`, {
      value: {
        pathname: `/`
      }
    });

    const headerSnapshot = renderer.create(
        <Header mode={HeaderMode.AUTH} />
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when window.location is not MainPage`, () => {
    window.location.pathname = `/page-name`;

    const headerSnapshot = renderer.create(
        <Header mode={HeaderMode.AUTH} />
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when header mode is "AUTH"`, () => {
    window.location.pathname = `/`;

    const headerSnapshot = renderer.create(
        <Header mode={HeaderMode.AUTH} />
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when header mode is "NO_AUTH"`, () => {
    window.location.pathname = `/`;

    const headerSnapshot = renderer.create(
        <Header mode={HeaderMode.NO_AUTH} />
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when header mode is "SIGN_IN"`, () => {
    window.location.pathname = `/`;

    const headerSnapshot = renderer.create(
        <Header mode={HeaderMode.SIGN_IN} />
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });
});
