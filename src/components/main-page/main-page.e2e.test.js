import React from "react";
import configureStore from "redux-mock-store";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import {AuthorizationStatus} from "../../reducers/user/user.js";
import {MainPage} from "./main-page.jsx";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../const.js";
import {history} from "../../history";

import {mockPromoMovie, mockMovies} from "../../__test-data__/test-mocks.js";


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
    playerStartTime: 0,
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

const openMovieDetailsPage = jest.fn();

const props = {
  promoMovie: mockPromoMovie,
  openMovieDetailsPage,
};

const mainPageElement = mount(
    <Router history={history} >
      <Provider store={store}>
        <MainPage {...props} />
      </Provider>
    </Router>
);


describe(`MainPage e2e-tests`, () => {
  it(`Should small movie card in catalog be pressed`, () => {
    const catalogElement = mainPageElement.find(`section.catalog`);
    [...catalogElement.find(`Link`)][0].props.onClick();
    [...catalogElement.find(`Link`)][1].props.onClick();

    expect(openMovieDetailsPage).toHaveBeenCalledTimes(2);
  });


  it(`Should promo movie card title be pressed`, () => {
    const movieCardElement = mainPageElement.find(`section.movie-card`);
    movieCardElement.find(`.movie-card__desc Link`).simulate(`click`);

    expect(openMovieDetailsPage).toHaveBeenCalled();
  });


  it(`Should promo movie card poster be pressed`, () => {
    const movieCardElement = mainPageElement.find(`section.movie-card`);
    movieCardElement.find(`.movie-card__info Link`).at(0).simulate(`click`);

    expect(openMovieDetailsPage).toHaveBeenCalled();
  });
});
