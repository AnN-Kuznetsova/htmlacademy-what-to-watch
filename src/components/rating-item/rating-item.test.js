import React from "react";
import renderer from "react-test-renderer";

import {RatingItem} from "./rating-item";


const props = {
  id: 1,
  onClick: () => {},
};


describe(`Render RatingItem`, () => {
  it(`RatingItem should match with snapshot`, () => {
    const ratingItemSnapshot = renderer.create(
        <RatingItem {...props} />
    ).toJSON();

    expect(ratingItemSnapshot).toMatchSnapshot();
  });
});
