import React from "react";
import renderer from "react-test-renderer";
import {MoviePage} from "./movie-page.jsx";
import {promoMovie, films} from "../../__test-data__/test-mocks.js";


const props = {
  currentMovie: promoMovie,
  films,
  onSmallMovieCardHover: () => {},
  onSmallMovieCardClick: () => {},
};


describe(`Render MoviePage`, () => {
  it(`Should match with snapshot`, () => {
    const moviePageSnapshot = renderer.create(
        <MoviePage {...props} />
    ).toJSON();

    expect(moviePageSnapshot).toMatchSnapshot();
  });
});
