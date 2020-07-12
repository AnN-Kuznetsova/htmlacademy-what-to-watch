import React from "react";
import renderer from "react-test-renderer";

import {MovieDetailsPage} from "./movie-details-page";

import {promoMovie} from "../../__test-data__/test-mocks.js";


global.window = Object.create(window);
Object.defineProperty(window, `location`, {
  value: {
    pathname: `/page-name`
  }
});

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const props = {
  activeMovie: promoMovie,
  onSmallMovieCardClick: () => {},
};


describe(`Render MovieDetailsPage`, () => {
  it(`Should match with snapshot`, () => {
    const movieDetailsPageSnapshot = renderer.create(
        <MovieDetailsPage {...props} />, nodeMock
    ).toJSON();

    expect(movieDetailsPageSnapshot).toMatchSnapshot();
  });
});
