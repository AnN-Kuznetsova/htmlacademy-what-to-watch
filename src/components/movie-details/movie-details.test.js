import React from "react";
import renderer from "react-test-renderer";

import {MovieDetails} from "./movie-details";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


describe(`Render MovieDetails`, () => {
  it(`Should match with snapshot`, () => {
    const movieDetailsSnapshot = renderer.create(
        <MovieDetails movie={mockPromoMovie} />
    ).toJSON();

    expect(movieDetailsSnapshot).toMatchSnapshot();
  });
});
