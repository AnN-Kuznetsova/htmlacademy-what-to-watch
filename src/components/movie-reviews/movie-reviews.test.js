import React from "react";
import renderer from "react-test-renderer";

import {MovieReviews} from "./movie-reviews";

import {promoMovie} from "../../__test-data__/test-mocks";


describe(`Render MovieReviews`, () => {
  it(`Should match with snapshot`, () => {
    const movieReviewsSnapshot = renderer.create(
        <MovieReviews movie={promoMovie} />
    ).toJSON();

    expect(movieReviewsSnapshot).toMatchSnapshot();
  });
});
