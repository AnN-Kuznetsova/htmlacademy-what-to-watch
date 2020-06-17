import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";
import React from "react";
import {SmallMovieCard} from "./small-movie-card.jsx";
import {movieTitle} from "../__test-data__/mocks.js";


Enzyme.configure({
  adapter: new Adapter(),
});


const onSmallMovieCardClick = jest.fn();

const props = {
  movieTitle,
  onSmallMovieCardClick,
};

const smallMovieCardElement = shallow(<SmallMovieCard {...props} />);


describe(`SmallMovieCard e2e-tests`, () => {
  it(`Should card title be pressed`, () => {
    const cardTitleLinkELement = smallMovieCardElement.find(`h3.small-movie-card__title .small-movie-card__link`);
    cardTitleLinkELement.simulate(`click`);
    expect(onSmallMovieCardClick).toHaveBeenCalled();
  });

  it(`Should card image be pressed`, () => {
    const cardImageElement = smallMovieCardElement.find(`div.small-movie-card__image`);
    cardImageElement.simulate(`click`);
    expect(onSmallMovieCardClick).toHaveBeenCalled();
  });
});
