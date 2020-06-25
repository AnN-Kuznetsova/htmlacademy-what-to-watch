import React from "react";
import {shallow} from "enzyme";
import {SmallMovieCard} from "./small-movie-card.jsx";
import {films} from "../../__test-data__/test-mocks.js";


const mockEvent = {
  preventDefault() {}
};

const onClick = jest.fn();
const onHover = jest.fn();

const props = {
  movie: films[1],
  onClick,
  onHover,
};

const smallMovieCardElement = shallow(<SmallMovieCard {...props} />);


describe(`SmallMovieCard e2e-tests`, () => {
  it(`Should card title be pressed and pass to the callback the movie data from which was created`, () => {
    const cardTitleLinkELement = smallMovieCardElement.find(`h3.small-movie-card__title .small-movie-card__link`);
    cardTitleLinkELement.simulate(`click`, mockEvent);

    expect(onClick).toHaveBeenCalled();
    expect(onClick.mock.calls[0][0]).toMatchObject(props.movie);
  });


  it(`Should card image be pressed and pass to the callback the movie data from which was created`, () => {
    const cardImageElement = smallMovieCardElement.find(`div.small-movie-card__image`);
    cardImageElement.simulate(`click`, mockEvent);

    expect(onClick).toHaveBeenCalled();
    expect(onClick.mock.calls[0][0]).toMatchObject(props.movie);
  });


  it(`Should card image be hover and pass to the callback the movie data from which was created`, () => {
    const cardImageElement = smallMovieCardElement.find(`div.small-movie-card__image`);
    cardImageElement.simulate(`mouseEnter`, mockEvent);

    expect(onHover).toHaveBeenCalled();
    expect(onHover.mock.calls[0][0]).toMatchObject(props.movie);
  });
});
