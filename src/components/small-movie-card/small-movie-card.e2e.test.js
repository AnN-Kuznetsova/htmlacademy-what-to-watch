import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import {SmallMovieCard} from "./catalog-movies-card.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


describe(`SmallMovieCard e2e-tests`, () => {
  it(`Should title be pressed`, () => {
    const titleClickHandler = jest.fn();

    const props = {
      movieTitle: `Aviator`,
      cardTitleClickHandler: titleClickHandler,
    };

    const catalogMoviesCardElement = shallow(<SmallMovieCard {...props} />);
    const titleLinkELement = catalogMoviesCardElement.find(`h3.small-movie-card__title .small-movie-card__link`);

    titleLinkELement.simulate(`click`);
    expect(titleClickHandler).toHaveBeenCalled();
  });
});
