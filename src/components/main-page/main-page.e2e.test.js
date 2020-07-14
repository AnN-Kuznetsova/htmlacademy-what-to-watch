import React from "react";
import configureStore from "redux-mock-store";
import {mount} from "enzyme";
import {Provider} from "react-redux";

import {MainPage} from "./main-page.jsx";

import {promoMovie, movies} from "../../__test-data__/test-mocks.js";


const mockEvent = {
  preventDefault() {}
};

const mockStore = configureStore([]);

const store = mockStore({
  movies,
  genre: `All genres`,
  movieList: movies,
});

const openMovieDetailsPage = jest.fn();

const props = {
  promoMovie,
  openMovieDetailsPage,
};

const mainPageElement = mount(
    <Provider store={store}>
      <MainPage {...props} />
    </Provider>
);


describe(`MainPage e2e-tests`, () => {
  it(`Should small movie card in catalog be pressed`, () => {
    const catalogElement = mainPageElement.find(`section.catalog`);
    const smallMovieCardElement = [...catalogElement.find(`article.small-movie-card`)][0];

    smallMovieCardElement.props.onClick(mockEvent);

    expect(openMovieDetailsPage).toHaveBeenCalled();
  });


  it(`Should promo movie card title be pressed`, () => {
    const movieCardElement = mainPageElement.find(`section.movie-card`);
    const movieCardTitleElement = [...movieCardElement.find(`h2.movie-card__title`)][0];

    movieCardTitleElement.props.onClick();

    expect(openMovieDetailsPage).toHaveBeenCalled();
  });


  it(`Should promo movie card poster be pressed`, () => {
    const movieCardElement = mainPageElement.find(`section.movie-card`);
    const movieCardPosterElement = [...movieCardElement.find(`div.movie-card__poster`)][0];

    movieCardPosterElement.props.onClick();

    expect(openMovieDetailsPage).toHaveBeenCalled();
  });
});
