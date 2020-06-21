import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import {SmallMovieCard} from "./small-movie-card.jsx";
import {movieTitles} from "../../__test-data__/test-mocks.js";


const props = {
  movieTitle: movieTitles[3],
  onClick: () => {},
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
