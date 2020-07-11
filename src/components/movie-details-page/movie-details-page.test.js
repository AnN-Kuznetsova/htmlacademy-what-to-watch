import React from "react";
import renderer from "react-test-renderer";

import {MovieDetailsPage} from "./movie-details-page";

import {promoMovie} from "../../__test-data__/test-mocks.js";


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
