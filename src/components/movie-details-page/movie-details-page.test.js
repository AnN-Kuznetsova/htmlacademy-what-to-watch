import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import {AuthorizationStatus} from "../../reducers/user/user";
import {MovieDetailsPage} from "./movie-details-page";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../const";
import {history} from "../../history";

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
  authorizationStatus: AuthorizationStatus.AUTH,
  onSmallMovieCardClick: () => {},
  onAddReviewButtonClick: () => {},
};


describe(`Render MovieDetailsPage`, () => {
  it(`Should match with snapshot when authorizationStatus is "AUTH"`, () => {
    const movieDetailsPageSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store}>
            <MovieDetailsPage {...props} />
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
            <MovieDetailsPage {...props} />
          </Provider>
        </Router>, nodeMock
    ).toJSON();

    expect(movieDetailsPageSnapshot).toMatchSnapshot();
  });
});
