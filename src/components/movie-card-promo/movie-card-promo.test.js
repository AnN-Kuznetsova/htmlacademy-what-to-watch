import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {AuthorizationStatus} from "../../reducers/user/user";
import {MovieCardPromo} from "./movie-card-promo";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../const";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.APPLICATION]: {
    activePage: PageType.MAIN,
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

const props = {
  movie: mockPromoMovie,
  onMovieClick: () => {},
  renderVideoPlayer: () => {},
  isPlayerVisible: false,
  onPlayButtonClick: () => {},
};


describe(`Render MovieCardPromo`, () => {
  it(`Should match with snapshot`, () => {
    const movieCardPromoSnapshot = renderer.create(
        <Provider store={store} >
          <MovieCardPromo {...props} />
        </Provider>
    ).toJSON();

    expect(movieCardPromoSnapshot).toMatchSnapshot();
  });
});
