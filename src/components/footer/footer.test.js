import React from "react";
import renderer from "react-test-renderer";
import {Footer} from "./footer.jsx";


global.window = Object.create(window);


describe(`Render Footer`, () => {
  it(`Should match with snapshot when window.location is MainPage`, () => {
    Object.defineProperty(window, `location`, {
      value: {
        pathname: `/`
      }
    });

    const footerSnapshot = renderer.create(
        <Footer />
    ).toJSON();

    expect(footerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when window.location is not MainPage`, () => {
    window.location.pathname = `/page-name`;

    const footerSnapshot = renderer.create(
        <Footer />
    ).toJSON();

    expect(footerSnapshot).toMatchSnapshot();
  });
});
