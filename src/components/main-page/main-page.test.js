import React from "react";
import renderer from "react-test-renderer";
import {MainPage} from "./main-page.jsx";
import {promoMovie, films} from "../../__test-data__/test-mocks.js";


const props = {
  currentMovie: promoMovie,
  films,
  isMoviePage: false,
  onSmallMovieCardHover: () => {},
  onSmallMovieCardClick: () => {},
  onCurrentMovieClick: () => {},
};


describe(`Render MainPage`, () => {
  it(`Should match with snapshot when isMoviePage is false`, () => {
    const mainPageSnapshot = renderer.create(
        <MainPage {...props} />
    ).toJSON();

    expect(mainPageSnapshot).toMatchSnapshot();
  });
});
