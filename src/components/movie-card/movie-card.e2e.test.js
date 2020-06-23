import React from "react";
import {shallow} from "enzyme";
import {MovieCard} from "./movie-card.jsx";
import {promoMovie} from "../../__test-data__/test-mocks.js";


const mockEvent = {
  preventDefault() {}
};

const onMovieClick = jest.fn();

const props = {
  promoMovie,
  onMovieClick,
};

const movieCardElement = shallow(<MovieCard {...props} />);


describe(`MovieCard e2e-tests`, () => {
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
