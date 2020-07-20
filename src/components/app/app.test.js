import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {AppComponent} from "./app.jsx";

import {PageType} from "../../const.js";

import {mockPromoMovie, mockMovies} from "../../__test-data__/test-mocks.js";


const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const mockStore = configureStore([]);

const store = mockStore({
  movies: mockMovies,
  genre: `All genres`,
  movieList: mockMovies,
  visibleMoviesCount: 8,
});

const props = {
  activeMovie: mockPromoMovie,
  onOpenMovieDetailsPage: () => {},
};


describe(`Render App`, () => {
  it(`Should match with snapshot when page is "MAIN"`, () => {
    props.activePage = PageType.MAIN;

    const appSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(appSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when page is "MOVIE_DETAILS"`, () => {
    props.activePage = PageType.MOVIE_DETAILS;

    const appSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(appSnapshot).toMatchSnapshot();
  });
});
