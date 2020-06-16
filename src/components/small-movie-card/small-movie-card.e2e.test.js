import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";
import React from "react";
import {SmallMovieCard} from "./small-movie-card.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


const onCardTitleClick = jest.fn();
const onCardImageClick = jest.fn();

const props = {
  movieTitle: `Aviator`,
  onCardTitleClick,
  onCardImageClick,
};

const smallMovieCardElement = shallow(<SmallMovieCard {...props} />);


describe(`SmallMovieCard e2e-tests`, () => {
  it(`Should card title be pressed`, () => {
    const cardTitleLinkELement = smallMovieCardElement.find(`h3.small-movie-card__title .small-movie-card__link`);
    cardTitleLinkELement.simulate(`click`);
    expect(onCardTitleClick).toHaveBeenCalled();
  });

  it(`Should card image be pressed`, () => {
    const cardImageElement = smallMovieCardElement.find(`div.small-movie-card__image`);
    cardImageElement.simulate(`click`);
    expect(onCardImageClick).toHaveBeenCalled();
  });
});
