import React from "react";
import renderer from "react-test-renderer";

import {withNewReview} from "./with-new-review";


const MockComponent = (props) => {
  return (
    <div {...props} />
  );
};

const ComponentWithNewReview = withNewReview(MockComponent);


describe(`Render withNewReview`, () => {
  it(`withNewReview should match with snapshot`, () => {
    const withNewReviewSnapshot = renderer.create(
        <ComponentWithNewReview />
    ).toJSON();

    expect(withNewReviewSnapshot).toMatchSnapshot();
  });
});
