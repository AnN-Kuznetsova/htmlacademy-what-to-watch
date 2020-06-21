import React from "react";
import {shallow} from "enzyme";
import {SmallMovieCard} from "./small-movie-card.jsx";
import {movieTitles} from "../../__test-data__/test-mocks.js";


const onClick = jest.fn();

const props = {
  movieTitle: movieTitles[3],
  onClick,
};

const smallMovieCardElement = shallow(<SmallMovieCard {...props} />);


describe(`SmallMovieCard e2e-tests`, () => {
  it(`Should card title be pressed`, () => {
    const cardTitleLinkELement = smallMovieCardElement.find(`h3.small-movie-card__title .small-movie-card__link`);
    cardTitleLinkELement.simulate(`click`);
    expect(onClick).toHaveBeenCalled();
  });

  it(`Should card image be pressed`, () => {
    const cardImageElement = smallMovieCardElement.find(`div.small-movie-card__image`);
    cardImageElement.simulate(`click`);
    expect(onClick).toHaveBeenCalled();
  });
});
