import React from "react";
import {MainPage} from "./main-page.jsx";
import {mount} from "enzyme";
import {promoMovie, films} from "../../__test-data__/test-mocks.js";

const mockEvent = {
  preventDefault() {}
};

const onSmallMovieCardHover = jest.fn();
const onSmallMovieCardClick = jest.fn();
const onPromoMovieClick = jest.fn();

const props = {
  promoMovie,
  films,
  onSmallMovieCardHover,
  onSmallMovieCardClick,
  onPromoMovieClick,
};

const mainPageElement = mount(<MainPage {...props} />);
const catalogElement = mainPageElement.find(`section.catalog`);
const smallMovieCardElement = [...catalogElement.find(`article.small-movie-card`)][0];
const movieCardElement = mainPageElement.find(`section.movie-card`);


describe(`MainPage e2e-tests`, () => {
  it(`Should small movie card in catalog be pressed`, () => {
    smallMovieCardElement.props.onClick(mockEvent);

    expect(onSmallMovieCardClick).toHaveBeenCalled();
  });


  it(`Should small movie card in catalog be hover and pass to the callback the movie data from which was created`, () => {
    smallMovieCardElement.props.onMouseEnter(mockEvent);

    expect(onSmallMovieCardHover).toHaveBeenCalled();
    expect(onSmallMovieCardHover.mock.calls[0][0]).toMatchObject(films[0]);
  });


  it(`Should promo movie card title be pressed`, () => {
    const movieCardTitleElement = [...movieCardElement.find(`h2.movie-card__title`)][0];
    movieCardTitleElement.props.onClick(mockEvent);

    expect(onPromoMovieClick).toHaveBeenCalled();
  });


  it(`Should promo movie card poster be pressed`, () => {
    const movieCardPosterElement = [...movieCardElement.find(`div.movie-card__poster`)][0];
    movieCardPosterElement.props.onClick(mockEvent);

    expect(onPromoMovieClick).toHaveBeenCalled();
  });
});
