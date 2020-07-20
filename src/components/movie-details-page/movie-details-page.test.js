import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {MovieDetailsPage} from "./movie-details-page";

import {mockPromoMovie, mockMovies} from "../../__test-data__/test-mocks.js";


global.window = Object.create(window);
Object.defineProperty(window, `location`, {
  value: {
    pathname: `/page-name`
  }
});

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

const mockStore = configureStore([]);

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const props = {
  activeMovie: mockPromoMovie,
  onSmallMovieCardClick: () => {},
};


describe(`Render MovieDetailsPage`, () => {
  it(`Should match with snapshot`, () => {
    const store = mockStore({
      movies: [],
      genre: ``,
      movieList: mockMovies,
      visibleSmallCardCount: 8,
    });

    const movieDetailsPageSnapshot = renderer.create(
        <Provider store={store}>
          <MovieDetailsPage {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(movieDetailsPageSnapshot).toMatchSnapshot();
  });
});
