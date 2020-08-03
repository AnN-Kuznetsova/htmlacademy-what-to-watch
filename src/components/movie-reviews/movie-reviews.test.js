import React from "react";
import renderer from "react-test-renderer";

import {MovieReviewsComponent} from "./movie-reviews";

import {mockReviews} from "../../__test-data__/test-mocks";


describe(`Render MovieReviews`, () => {
  it(`Should match with snapshot`, () => {
    const movieReviewsSnapshot = renderer.create(
        <MovieReviewsComponent reviews={mockReviews} />
    ).toJSON();

    expect(movieReviewsSnapshot).toMatchSnapshot();
  });
});
