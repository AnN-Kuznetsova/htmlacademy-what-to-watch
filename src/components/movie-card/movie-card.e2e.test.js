import React from "react";
import {shallow} from "enzyme";
import {MovieCard} from "./movie-card.jsx";
import {promoMovie} from "../../__test-data__/test-mocks.js";


const mockEvent = {
  preventDefault() {}
};


describe(`MovieCard e2e-tests when isMoviePage is false`, () => {
  const onMovieClick = jest.fn();
  const props = {
    movie: promoMovie,
    isMoviePage: false,
    onMovieClick,
  };
  const movieCardElement = shallow(<MovieCard {...props} />);

  it(`Should title be pressed`, () => {
    const titleElement = movieCardElement.find(`h2.movie-card__title`);
    titleElement.simulate(`click`, mockEvent);

    expect(onMovieClick).toHaveBeenCalled();
  });

  it(`Should poster be pressed`, () => {
    const posterElement = movieCardElement.find(`div.movie-card__poster`);
    posterElement.simulate(`click`, mockEvent);

    expect(onMovieClick).toHaveBeenCalled();
  });
});


describe(`MovieCard e2e-tests when isMoviePage is true`, () => {
  const onMovieClick = jest.fn();
  const props = {
    movie: promoMovie,
    isMoviePage: true,
    onMovieClick,
  };
  const movieCardElement = shallow(<MovieCard {...props} />);

  it(`Should title do not be pressed`, () => {
    const titleElement = movieCardElement.find(`h2.movie-card__title`);
    titleElement.simulate(`click`, mockEvent);

    expect(onMovieClick).not.toHaveBeenCalled();
  });

  it(`Should poster do not be pressed`, () => {
    const posterElement = movieCardElement.find(`div.movie-card__poster`);
    posterElement.simulate(`click`, mockEvent);

    expect(onMovieClick).not.toHaveBeenCalled();
  });
});
