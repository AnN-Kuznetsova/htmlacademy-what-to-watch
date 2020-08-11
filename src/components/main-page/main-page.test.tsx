import * as React from "react";
import configureStore from "redux-mock-store";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import {AuthorizationStatus} from "../../reducers/user/user.js";
import {MainPageComponent} from "./main-page";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../types";
import {history} from "../../history";
import {noop} from "../../utils/utils";

import {mockPromoMovie, mockMovies} from "../../__test-data__/test-mocks";


global.window = Object.create(window);
Object.defineProperty(window, `location`, {
  value: {
    pathname: `/`
  }
});

const mockStore = configureStore([]);

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
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

const props = {
  promoMovie: mockPromoMovie,
  onOpenMainPage: noop,
};

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};


describe(`Render MainPage`, () => {
  it(`Should match with snapshot`, () => {
    const mainPageSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store}>
            <MainPageComponent {...props} />
          </Provider>
        </Router>, nodeMock
    ).toJSON();

    expect(mainPageSnapshot).toMatchSnapshot();
  });
});
