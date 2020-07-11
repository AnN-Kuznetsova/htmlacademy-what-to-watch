import React from "react";
import renderer from "react-test-renderer";

import {MainPage} from "./main-page.jsx";


const props = {
  openMovieDetailsPage: () => {},
};

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};


describe(`Render MainPage`, () => {
  it(`Should match with snapshot`, () => {
    const mainPageSnapshot = renderer.create(
        <MainPage {...props} />, nodeMock
    ).toJSON();

    expect(mainPageSnapshot).toMatchSnapshot();
  });
});
