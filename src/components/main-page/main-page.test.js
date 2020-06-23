import React from "react";
import renderer from "react-test-renderer";
import {MainPage} from "./main-page.jsx";
import {promoMovie, films} from "../../__test-data__/test-mocks.js";


const props = {
  promoMovie,
  films,
  onSmallMovieCardHover: () => {},
  onSmallMovieCardClick: () => {},
};


describe(`Render MainPage`, () => {
  it(`Should match with snapshot`, () => {
    const mainPageSnapshot = renderer.create(
        <MainPage {...props} />
    ).toJSON();

    expect(mainPageSnapshot).toMatchSnapshot();
  });
});
