import React from "react";
import {MoviePage} from "./movie-page.jsx";
import {mount} from "enzyme";
import {films, promoMovie} from "../../__test-data__/test-mocks.js";

const mockEvent = {
  preventDefault() {}
};

const onSmallMovieCardHover = jest.fn();
const onSmallMovieCardClick = jest.fn();

const props = {
  currentMovie: promoMovie,
  films,
  onSmallMovieCardHover,
  onSmallMovieCardClick,
};

const moviePageElement = mount(<MoviePage {...props} />);
const catalogElement = moviePageElement.find(`section.catalog`);
const smallMovieCardElement = [...catalogElement.find(`article.small-movie-card`)][0];


describe(`MoviePage e2e-tests`, () => {
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
