import React from "react";
import renderer from "react-test-renderer";
import {MovieCard} from "./movie-card.jsx";


const props = {
  promoMovie: {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    releaseDate: new Date(2014, 0),
    posterUrl: `img/the-grand-budapest-hotel-poster.jpg`,
    backgroundUrl: `img/bg-the-grand-budapest-hotel.jpg`,
  },
};


describe(`Render MovieCard`, () => {
  it(`Render correctly MovieCard component`, () => {
    const movieCardComponent = renderer.create(
        <MovieCard {...props} />
    ).toJSON();

    expect(movieCardComponent).toMatchSnapshot();
  });
});
