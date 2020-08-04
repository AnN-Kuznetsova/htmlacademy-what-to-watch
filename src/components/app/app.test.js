import React from "react";
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
      },
      [NameSpace.APPLICATION]: {
        genre: `All genres`,
        visibleMoviesCount: 8,
        activeMovie: mockPromoMovie,
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
      activePage: PageType.MAIN,
      promoMovie: mockPromoMovie,
      movies: mockMovies,
      authorizationStatus: AuthorizationStatus.AUTH,
      onOpenMovieDetailsPage: () => {},
      onAddReviewButtonClick: () => {},
      setDataError: () => {},
      sendReview: () => {},
      changeActivePage: () => {},
      changeActiveMovie: () => {},
    };

    const appSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(appSnapshot).toMatchSnapshot();
  });
});
