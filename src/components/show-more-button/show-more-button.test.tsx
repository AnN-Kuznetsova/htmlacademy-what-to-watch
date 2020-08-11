import * as React from "react";
import * as renderer from "react-test-renderer";

import {ShowMoreButton} from "./show-more-button";
import {noop} from "../../utils/utils";


const props = {
  onClick: noop,
};


describe(`Render ShowMoreButton`, () => {
  it(`Should match with snapshot`, () => {
    const showMoreButtonSnapshot = renderer.create(
        <ShowMoreButton {...props} />
    ).toJSON();

    expect(showMoreButtonSnapshot).toMatchSnapshot();
  });
});
