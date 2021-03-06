import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import {AuthorizationStatus} from "../../reducers/user/user";
import {MovieCardPromo} from "./movie-card-promo";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../types";
import {history} from "../../history";
import {noop} from "../../utils/utils";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.APPLICATION]: {
    activePage: PageType.MAIN,
    activeMovie: mockPromoMovie,
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

const props = {
  movie: mockPromoMovie,
  renderVideoPlayer: noop,
  onPlayButtonClick: noop,
};


describe(`Render MovieCardPromo`, () => {
  it(`Should match with snapshot`, () => {
    const movieCardPromoSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <MovieCardPromo {...props} />
          </Provider>
        </Router>
    ).toJSON();

    expect(movieCardPromoSnapshot).toMatchSnapshot();
  });
});
