import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import {AuthorizationStatus} from "../../reducers/user/user";
import {MovieCardFull} from "./movie-card-full";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../const";
import {history} from "../../history";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


global.window = Object.create(window);
Object.defineProperty(window, `location`, {
  value: {
    pathname: `/page-name`,
  }
});

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.APPLICATION]: {
    activePage: PageType.MOVIE_DETAILS,
    activeMovie: mockPromoMovie,
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

const props = {
  movie: mockPromoMovie,
  authorizationStatus: AuthorizationStatus.AUTH,
  onAddReviewButtonClick: () => {},
  renderVideoPlayer: () => {},
  onPlayButtonClick: () => {},
};


describe(`Render MovieCardFull`, () => {
  it(`Should match with snapshot when authorizationStatus is "AUTH`, () => {
    const movieCardFulSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store}>
            <MovieCardFull {...props} />
          </Provider>
        </Router>
    ).toJSON();

    expect(movieCardFulSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when authorizationStatus is "NO_AUTH`, () => {
    props.authorizationStatus = AuthorizationStatus.NO_AUTH;

    const movieCardFulSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store}>
            <MovieCardFull {...props} />
          </Provider>
        </Router>
    ).toJSON();

    expect(movieCardFulSnapshot).toMatchSnapshot();
  });
});
