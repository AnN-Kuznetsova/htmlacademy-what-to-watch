import React from "react";
import renderer from "react-test-renderer";
import {MainPage} from "./main-page.jsx";
import {promoMovie, movieTitles} from "../__test-data__/mocks.js";


const props = {
  promoMovie,
  movieTitles,
};


describe(`Render MainPage`, () => {
  it(`Should match with snapshot`, () => {
    const mainPageSnapshot = renderer.create(
        <MainPage {...props} />
    ).toJSON();

    expect(mainPageSnapshot).toMatchSnapshot();
  });
});
