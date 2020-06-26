import React from "react";
import {MainPage} from "./main-page.jsx";
import {PageType} from "../../const.js";
import {mount} from "enzyme";
import {promoMovie, films} from "../../__test-data__/test-mocks.js";


const mockEvent = {
  preventDefault() {}
};

const props = {
  currentMovie: promoMovie,
  films,
  activePage: PageType.MAIN_INDEX,
  onSmallMovieCardHover: () => {},
  onSmallMovieCardClick: () => {},
  onCurrentMovieClick: () => {},
};


describe(`MainPage e2e-tests`, () => {
  describe(`Small movie card in catalog e2e-tests`, () => {
    const onSmallMovieCardHover = jest.fn();
    const onSmallMovieCardClick = jest.fn();

    props.onSmallMovieCardHover = onSmallMovieCardHover;
    props.onSmallMovieCardClick = onSmallMovieCardClick;

    const mainPageElement = mount(<MainPage {...props} />);
    const catalogElement = mainPageElement.find(`section.catalog`);
    const smallMovieCardElement = [...catalogElement.find(`article.small-movie-card`)][0];


    it(`Should small movie card in catalog be pressed`, () => {
      smallMovieCardElement.props.onClick(mockEvent);
      expect(onSmallMovieCardClick).toHaveBeenCalled();
    });


    it(`Should small movie card in catalog be hover and pass to the callback the movie data from which was created`, () => {
      smallMovieCardElement.props.onMouseEnter(mockEvent);
      expect(onSmallMovieCardHover).toHaveBeenCalled();
      expect(onSmallMovieCardHover.mock.calls[0][0]).toMatchObject(films[0]);
    });
  });


  describe(`Current movie e2e-tests when active page is MAIN_INDEX`, () => {
    const onCurrentMovieClick = jest.fn();

    props.onCurrentMovieClick = onCurrentMovieClick;

    const mainPageElement = mount(<MainPage {...props} />);
    const movieCardElement = mainPageElement.find(`section.movie-card`);


    it(`Should current movie card title be pressed`, () => {
      const movieCardTitleElement = [...movieCardElement.find(`h2.movie-card__title`)][0];
      movieCardTitleElement.props.onClick(mockEvent);
      expect(onCurrentMovieClick).toHaveBeenCalled();
    });


    it(`Should current movie card poster be pressed`, () => {
      const movieCardPosterElement = [...movieCardElement.find(`div.movie-card__poster`)][0];
      movieCardPosterElement.props.onClick(mockEvent);
      expect(onCurrentMovieClick).toHaveBeenCalled();
    });
  });


  describe(`Current movie e2e-tests when active page is MAIN_MOVIE_DETAILS`, () => {
    props.activePage = PageType.MAIN_MOVIE_DETAILS;
    const onCurrentMovieClick = jest.fn();

    props.onCurrentMovieClick = onCurrentMovieClick;

    const mainPageElement = mount(<MainPage {...props} />);
    const movieCardElement = mainPageElement.find(`section.movie-card`);


    it(`Should current movie card title do not be pressed`, () => {
      const movieCardTitleElement = [...movieCardElement.find(`h2.movie-card__title`)][0];
      movieCardTitleElement.props.onClick(mockEvent);
      expect(onCurrentMovieClick).not.toHaveBeenCalled();
    });


    it(`Should current movie card poster do not be pressed`, () => {
      const movieCardPosterElement = [...movieCardElement.find(`div.movie-card__poster`)][0];
      movieCardPosterElement.props.onClick(mockEvent);
      expect(onCurrentMovieClick).not.toHaveBeenCalled();
    });
  });
});
