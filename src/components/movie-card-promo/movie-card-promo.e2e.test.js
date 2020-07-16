import React from "react";
import {shallow} from "enzyme";

import {MovieCardPromo} from "./movie-card-promo.jsx";

import {mockPromoMovie} from "../../__test-data__/test-mocks.js";


const onMovieClick = jest.fn();

const props = {
  movie: mockPromoMovie,
  onMovieClick,
};

const movieCardPromoElement = shallow(<MovieCardPromo {...props} />);


describe(`MovieCardPromo e2e-tests`, () => {
  it(`Title should be pressed`, () => {

    const titleElement = movieCardPromoElement.find(`h2.movie-card__title`);
    titleElement.simulate(`click`);

    expect(onMovieClick).toHaveBeenCalled();
  });


  it(`Should poster be pressed`, () => {
    const posterElement = movieCardPromoElement.find(`div.movie-card__poster`);
    posterElement.simulate(`click`);

    expect(onMovieClick).toHaveBeenCalled();
  });
});
