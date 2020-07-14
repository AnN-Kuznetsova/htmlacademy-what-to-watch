import React from "react";
import renderer from "react-test-renderer";

import {MovieDetails} from "./movie-details";

import {promoMovie} from "../../__test-data__/test-mocks";


describe(`Render MovieDetails`, () => {
  it(`Should match with snapshot`, () => {
    const movieDetailsSnapshot = renderer.create(
        <MovieDetails movie={promoMovie} />
    ).toJSON();

    expect(movieDetailsSnapshot).toMatchSnapshot();
  });
});
