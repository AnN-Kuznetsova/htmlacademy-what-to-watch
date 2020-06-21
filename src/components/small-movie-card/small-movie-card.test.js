import React from "react";
import renderer from "react-test-renderer";
import {SmallMovieCard} from "./small-movie-card.jsx";
import {films} from "../../__test-data__/test-mocks.js";
import {shallow} from "enzyme";


const props = {
  movie: films[1],
  onClick: () => {},
  onHover: () => {},
};

const smallMovieCardElement = shallow(<SmallMovieCard {...props} />);


describe(`Render SmallMovieCard`, () => {
  it(`Should match with snapshot`, () => {
    const smallMovieCardSnapshot = renderer.create(
        <SmallMovieCard {...props} />
    ).toJSON();

    expect(smallMovieCardSnapshot).toMatchSnapshot();
  });


  it(`Should render correct movie title`, () => {
    expect(smallMovieCardElement.find(`h3.small-movie-card__title .small-movie-card__link`).text())
      .toEqual(props.movie.title);

    expect(smallMovieCardElement.find(`div.small-movie-card__image img`).prop(`alt`))
      .toEqual(props.movie.title);
  });


  it(`Should render correct small picture url`, () => {
    expect(smallMovieCardElement.find(`div.small-movie-card__image img`).prop(`src`))
      .toEqual(props.movie.smallPictureUrl);
  });
});
