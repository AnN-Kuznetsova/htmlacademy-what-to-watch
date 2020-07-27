import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {AppComponent} from "./app.jsx";
import {NameSpace} from "../../reducers/name-space";

import {PageType} from "../../const.js";

import {AuthorizationStatus} from "../../reducers/user/user";

import {mockPromoMovie, mockMovies} from "../../__test-data__/test-mocks";


const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    movies: mockMovies,
  },
  [NameSpace.APPLICATION]: {
    genre: `All genres`,
    visibleMoviesCount: 8,
    activePage: PageType.MAIN,
    prevPage: ``,
    playerStartTime: 0,
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

const props = {
  dataError: null,
  activeMovie: mockPromoMovie,
  activePage: ``,
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


  it(`Should match with snapshot when page is "PLAYER"`, () => {
    props.activePage = PageType.PLAYER;

    const appSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(appSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when page is "ERROR"`, () => {
    props.activePage = PageType.ERROR;
    props.dataError = {request: true};

    const appSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(appSnapshot).toMatchSnapshot();
  });
});
