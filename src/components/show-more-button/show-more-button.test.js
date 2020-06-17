import React from "react";
import renderer from "react-test-renderer";
import {ShowMoreButton} from "./show-more-button.jsx";


const props = {
  onClick: () => {},
};


describe(`Render ShowMoreButton`, () => {
  it(`Should match with snapshot`, () => {
    const showMoreButtonSnapshot = renderer.create(
        <ShowMoreButton {...props} />
    ).toJSON();

    expect(showMoreButtonSnapshot).toMatchSnapshot();
  });
});
