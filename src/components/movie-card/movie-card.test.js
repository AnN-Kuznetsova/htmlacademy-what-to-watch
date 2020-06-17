import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import {MovieCard} from "./movie-card.jsx";
import {promoMovie} from "../../__test-data__/test-mocks.js";


const props = promoMovie;

const movieCardElement = shallow(<MovieCard {...props} />
);


describe(`Render MovieCard`, () => {
  it(`Should match with snapshot`, () => {
    const movieCardSnapshot = renderer.create(
        <MovieCard {...props} />
    ).toJSON();

    expect(movieCardSnapshot).toMatchSnapshot();
  });

  it(`Should render correct promo-movie title`, () => {
    expect(movieCardElement.find(`div.movie-card__bg img`).prop(`alt`))
      .toEqual(props.title);

    expect(movieCardElement.find(`div.movie-card__poster img`).prop(`alt`))
      .toEqual(props.title);

    expect(movieCardElement.find(`h2.movie-card__title`).text())
      .toEqual(props.title);
  });

  it(`Should render correct promo-movie genre`, () => {
    expect(movieCardElement.find(`span.movie-card__genre`).text())
      .toEqual(props.genre);
  });

  it(`Should render correct promo-movie release date`, () => {
    expect(movieCardElement.find(`span.movie-card__year`).text())
      .toEqual(props.releaseDate.getFullYear().toString());
  });

  it(`Should render correct promo-movie poster`, () => {
    expect(movieCardElement.find(`div.movie-card__poster img`).prop(`src`))
      .toEqual(props.posterUrl);
  });

  it(`Should render correct movie card background`, () => {
    expect(movieCardElement.find(`div.movie-card__bg img`).prop(`src`))
      .toEqual(props.backgroundUrl);
  });
});
