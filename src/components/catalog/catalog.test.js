import React from "react";
import renderer from "react-test-renderer";

import {CatalogComponent} from "./catalog";

import {mockMovies} from "../../__test-data__/test-mocks";


const props = {
  movieList: [],
  visibleCardCount: 8,
  onSmallMovieCardClick: () => {},
  onShowMoreButtonClick: () => {},
};

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};


describe(`Render Catalog`, () => {
  it(`Catalog should match with snapshot with ShowMoreButton`, () => {
    props.movieList = [].concat(mockMovies, mockMovies, mockMovies);

    const catalogSnapshot = renderer.create(
        <CatalogComponent {...props} />, nodeMock
    ).toJSON();

    expect(catalogSnapshot).toMatchSnapshot();
  });


  it(`Catalog should match with snapshot without ShowMoreButton`, () => {
    props.movieList = mockMovies;

    const catalogSnapshot = renderer.create(
        <CatalogComponent {...props} />, nodeMock
    ).toJSON();

    expect(catalogSnapshot).toMatchSnapshot();
  });
});
