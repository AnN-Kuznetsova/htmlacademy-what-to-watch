import React from "react";
import renderer from "react-test-renderer";
import {MovieCard} from "./movie-card.jsx";


const props = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: new Date(2014, 0),
  posterUrl: `img/the-grand-budapest-hotel-poster.jpg`,
  backgroundUrl: `img/bg-the-grand-budapest-hotel.jpg`,
};


describe(`Render MovieCard`, () => {
  it(`Should match with snapshot`, () => {
    const movieCardSnapshot = renderer.create(
        <MovieCard {...props} />
    ).toJSON();

    expect(movieCardSnapshot).toMatchSnapshot();
  });
});
