import React from "react";
import renderer from "react-test-renderer";

import {AddReviewPage} from "./add-review-page";


describe(`Render AddReviewPage`, () => {
  it(`AddReviewPage should match with snapshot`, () => {
    const addReviewPageSnapshot = renderer.create(
        <AddReviewPage />
    ).toJSON();

    expect(addReviewPageSnapshot).toMatchSnapshot();
  });
});
