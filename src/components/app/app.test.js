import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {promoMovie, films} from "../../__test-data__/test-mocks.js";


const props = {
  promoMovie,
  films,
};


describe(`Render App`, () => {
  it(`Should match with snapshot`, () => {
    const appSnapshot = renderer.create(
        <App {...props} />
    ).toJSON();

    expect(appSnapshot).toMatchSnapshot();
  });
});
