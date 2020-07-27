import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {AuthorizationStatus} from "../../reducers/user/user";
import {MovieCardFull} from "./movie-card-full";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../const";

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
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

const props = {
  movie: mockPromoMovie,
  renderVideoPlayer: () => {},
  isPlayerVisible: false,
  onPlayButtonClick: () => {},
};


describe(`Render MovieCardFull`, () => {
  it(`Should match with snapshot`, () => {
    const movieCardFulSnapshot = renderer.create(
        <Provider store={store}>
          <MovieCardFull {...props} />
        </Provider>
    ).toJSON();

    expect(movieCardFulSnapshot).toMatchSnapshot();
  });
});
