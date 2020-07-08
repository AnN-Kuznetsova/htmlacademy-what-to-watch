import React from "react";
import renderer from "react-test-renderer";
import {Footer} from "./footer.jsx";


describe(`Render Footer`, () => {
  it(`Should match with snapshot`, () => {
    const footerSnapshot = renderer.create(
        <Footer />
    ).toJSON();

    expect(footerSnapshot).toMatchSnapshot();
  });
});
