import React from "react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import {shallow, mount} from "enzyme";

import {AuthorizationStatus} from "../../reducers/user/user.js";
import {MovieCardPromo} from "./movie-card-promo.jsx";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../const.js";
import {history} from "../../history";

import {mockPromoMovie} from "../../__test-data__/test-mocks.js";


const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.APPLICATION]: {
    activePage: PageType.MAIN,
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

const onMovieClick = jest.fn();

const props = {
  movie: mockPromoMovie,
  onMovieClick,
  renderVideoPlayer: () => {},
  isPlayerVisible: false,
  onPlayButtonClick: () => {},
};

const movieCardPromoElement = mount(
    <Router history={history} >
      <Provider store={store} >
        <MovieCardPromo {...props} />
      </Provider>
    </Router>
);


describe(`MovieCardPromo e2e-tests`, () => {
  it(`Title should be pressed`, () => {
    movieCardPromoElement.find(`.movie-card__desc Link`).simulate(`click`);

    expect(onMovieClick).toHaveBeenCalled();
  });


  it(`Should poster be pressed`, () => {
    movieCardPromoElement.find(`.movie-card__info Link`).at(0).simulate(`click`);

    expect(onMovieClick).toHaveBeenCalled();
  });
});
