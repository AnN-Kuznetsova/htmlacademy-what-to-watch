import React from "react";
import renderer from "react-test-renderer";

import {Catalog} from "./catalog.jsx";

import {movies} from "../../__test-data__/test-mocks.js";


const props = {
  movies,
  onSmallMovieCardClick: () => {},
};

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};


describe(`Render Catalog`, () => {
  it(`Catalog should match with snapshot`, () => {
    const catalogSnapshot = renderer.create(
        <Catalog {...props} />, nodeMock
    ).toJSON();

    expect(catalogSnapshot).toMatchSnapshot();
  });
});
