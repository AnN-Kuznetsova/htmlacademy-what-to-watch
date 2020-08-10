import * as React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {AppComponent} from "./app";
import {AuthorizationStatus} from "../../reducers/user/user";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../const";

import {mockPromoMovie, mockMovies} from "../../__test-data__/test-mocks";


global.window = Object.create(window);

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const mockStore = configureStore([]);


describe(`Render App`, () => {
  it(`Should match with snapshot`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        movies: mockMovies,
        promoMovie: mockPromoMovie,
      },
      [NameSpace.APPLICATION]: {
        genre: `All genres`,
        visibleMoviesCount: 8,
        activeMovie: mockPromoMovie,
        activePage: PageType.MAIN,
        prevPage: ``,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    const props = {
      dataError: null,
      activePage: PageType.MAIN,
      movies: mockMovies,
      promoMovie: mockPromoMovie,
      onError: () => {},
    };

    const appSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(appSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when authorizationStatus is NO_AUTH`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        movies: mockMovies,
        promoMovie: mockPromoMovie,
      },
      [NameSpace.APPLICATION]: {
        genre: `All genres`,
        visibleMoviesCount: 8,
        activeMovie: mockPromoMovie,
        activePage: PageType.MAIN,
        prevPage: ``,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    const props = {
      dataError: null,
      activePage: PageType.MAIN,
      movies: mockMovies,
      promoMovie: mockPromoMovie,
      onError: () => {},
    };

    const appSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(appSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot with data error 400`, () => {
    const store = mockStore({
      [NameSpace.APPLICATION]: {
        activeMovie: mockPromoMovie,
        activePage: PageType.ERROR,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    const props = {
      dataError: {status: 400},
      activePage: PageType.ERROR,
      onError: () => {},
    };

    const appSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(appSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot with data error 404`, () => {
    const store = mockStore({
      [NameSpace.APPLICATION]: {
        activeMovie: mockPromoMovie,
        activePage: PageType.ERROR,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    const props = {
      dataError: {status: 404},
      activePage: PageType.ERROR,
      onError: () => {},
    };

    const appSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(appSnapshot).toMatchSnapshot();
  });
});
