import React from "react";
import renderer from "react-test-renderer";

import {MovieReviews} from "./movie-reviews";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


describe(`Render MovieReviews`, () => {
  it(`Should match with snapshot`, () => {
    const movieReviewsSnapshot = renderer.create(
        <MovieReviews movie={mockPromoMovie} />
    ).toJSON();

    expect(movieReviewsSnapshot).toMatchSnapshot();
  });
});
