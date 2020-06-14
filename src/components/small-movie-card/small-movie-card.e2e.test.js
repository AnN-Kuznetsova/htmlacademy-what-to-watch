import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import {SmallMovieCard} from "./catalog-movies-card.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


describe(`CatalogMoviesCard e2e-tests`, () => {
  const cardTitleClickHandler = jest.fn();
  const cardImageClickHandler = jest.fn();

  const props = {
    movieTitle: `Aviator`,
    cardTitleClickHandler,
    cardImageClickHandler,
  };

  const catalogMoviesCardElement = shallow(<SmallMovieCard {...props} />);

  it(`Should card title be pressed`, () => {
    const cardTitleLinkELement = catalogMoviesCardElement.find(`h3.small-movie-card__title .small-movie-card__link`);
    cardTitleLinkELement.simulate(`click`);
    expect(cardTitleClickHandler).toHaveBeenCalled();
  });

  it(`Should card image be pressed`, () => {
    const cardImageElement = catalogMoviesCardElement.find(`div.small-movie-card__image img`);
    cardImageElement.simulate(`click`);
    expect(cardImageClickHandler).toHaveBeenCalled();
  });
});
