import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {CatalogComponent} from "./catalog";
import {NameSpace} from "../../reducers/name-space";

import {mockMovies} from "../../__test-data__/test-mocks";


const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.APPLICATION]: {
    activePage: ``,
    prevPage: ``,
    playerStartTime: 0,
  },
});

const props = {
  movies: [],
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
    props.movies = [].concat(mockMovies, mockMovies, mockMovies);

    const catalogSnapshot = renderer.create(
        <Provider store={store}>
          <CatalogComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(catalogSnapshot).toMatchSnapshot();
  });


  it(`Catalog should match with snapshot without ShowMoreButton`, () => {
    props.movies = mockMovies;

    const catalogSnapshot = renderer.create(
        <Provider store={store}>
          <CatalogComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(catalogSnapshot).toMatchSnapshot();
  });
});
