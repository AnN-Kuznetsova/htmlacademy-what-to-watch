import React from "react";
import renderer from "react-test-renderer";
import {SmallMovieCard} from "./small-movie-card.jsx";


const props = {
  movieTitle: `Aviator`,
  cardTitleClickHandler: () => {},
};


describe(`Render SmallMovieCard`, () => {
  it(`Render correctly SmallMovieCard component`, () => {
    const catalogMoviesCardComponent = renderer.create(
        <SmallMovieCard {...props} />
    ).toJSON();

    expect(catalogMoviesCardComponent).toMatchSnapshot();
  });
});
