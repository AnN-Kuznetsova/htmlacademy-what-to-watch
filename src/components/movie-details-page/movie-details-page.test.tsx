import * as React from "react";
import configureStore from "redux-mock-store";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import {AuthorizationStatus} from "../../reducers/user/user";
import {MovieDetailsPageComponent} from "./movie-details-page";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../types";
import {history} from "../../history";
import {noop} from "../../utils/utils";

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
    activeMovie: mockPromoMovie,
    activePage: PageType.MOVIE_DETAILS,
    prevPage: ``,
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
  routeProps: {
    match: {
      params: 1}
  },
  movie: mockPromoMovie,
  authorizationStatus: AuthorizationStatus.AUTH,
  onAddReviewButtonClick: noop,
  onOpenMovieDetailsPage: noop,
  onError: noop,
};


describe(`Render MovieDetailsPage`, () => {
  it(`Should match with snapshot when authorizationStatus is "AUTH"`, () => {
    const movieDetailsPageSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store}>
            <MovieDetailsPageComponent {...props} />
          </Provider>
        </Router>, nodeMock
    ).toJSON();

    expect(movieDetailsPageSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when authorizationStatus is "NO_AUTH"`, () => {
    props.authorizationStatus = AuthorizationStatus.NO_AUTH;

    const movieDetailsPageSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store}>
            <MovieDetailsPageComponent {...props} />
          </Provider>
        </Router>, nodeMock
    ).toJSON();

    expect(movieDetailsPageSnapshot).toMatchSnapshot();
  });
});
