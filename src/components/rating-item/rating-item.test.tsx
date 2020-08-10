import * as React from "react";
import renderer from "react-test-renderer";

import {RatingItem} from "./rating-item";


describe(`Render RatingItem`, () => {
  it(`RatingItem should match with snapshot`, () => {
    const props = {
      id: 1,
      rating: 2,
      onChange: () => {},
    };

    const ratingItemSnapshot = renderer.create(
        <RatingItem {...props} />
    ).toJSON();

    expect(ratingItemSnapshot).toMatchSnapshot();
  });


  it(`RatingItem should match with snapshot when it is checked`, () => {
    const props = {
      id: 1,
      rating: 1,
      onChange: () => {},
    };

    const ratingItemSnapshot = renderer.create(
        <RatingItem {...props} />
    ).toJSON();

    expect(ratingItemSnapshot).toMatchSnapshot();
  });
});
