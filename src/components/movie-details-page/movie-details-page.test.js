import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {AuthorizationStatus} from "../../reducers/user/user";
import {MovieDetailsPage} from "./movie-details-page";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../const";

import {mockPromoMovie, mockMovies} from "../../__test-data__/test-mocks";


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

const store = mockStore({
  [NameSpace.DATA]: {
    movies: mockMovies,
  },
  [NameSpace.APPLICATION]: {
    genre: `All genres`,
    visibleMoviesCount: 8,
    activePage: PageType.MOVIE_DETAILS,
    prevPage: ``,
    playerStartTime: 0,
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

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

    const movieDetailsPageSnapshot = renderer.create(
        <Provider store={store}>
          <MovieDetailsPage {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(movieDetailsPageSnapshot).toMatchSnapshot();
  });
});
