import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import {SmallMovieCard} from "./small-movie-card.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


const props = {
  movieTitle: `Aviator`,
  onCardTitleClick: () => {},
  onCardImageClick: () => {},
};


describe(`Render SmallMovieCard`, () => {
  it(`Should match with snapshot`, () => {
    const smallMovieCardSnapshot = renderer.create(
        <SmallMovieCard {...props} />
    ).toJSON();

    expect(smallMovieCardSnapshot).toMatchSnapshot();
  });


  it(`Should render correct movie title`, () => {
    const smallMovieCardElement = shallow(
        <SmallMovieCard {...props} />
    );

    expect(smallMovieCardElement.find(`h3.small-movie-card__title .small-movie-card__link`).text())
      .toEqual(props.movieTitle);

    expect(smallMovieCardElement.find(`div.small-movie-card__image img`).prop(`alt`))
      .toEqual(props.movieTitle);
  });
});
