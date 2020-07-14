import React from "react";
import renderer from "react-test-renderer";

import {CatalogComponent} from "./catalog.jsx";

import {mockMovies} from "../../__test-data__/test-mocks.js";


const props = {
  movies: [],
  movieList: mockMovies,
  onSmallMovieCardClick: () => {},
  renderFilter: () => {},
  activeFilter: ``,
  onGenreFilterClick: () => {},
};

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};


describe(`Render Catalog`, () => {
  it(`Catalog should match with snapshot`, () => {
    const catalogSnapshot = renderer.create(
        <CatalogComponent {...props} />, nodeMock
    ).toJSON();

    expect(catalogSnapshot).toMatchSnapshot();
  });
});
