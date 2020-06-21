import React from "react";
import renderer from "react-test-renderer";
import {MovieCard} from "./movie-card.jsx";
import {promoMovie} from "../../__test-data__/test-mocks.js";
import {shallow} from "enzyme";


const movieCardElement = shallow(<MovieCard {...promoMovie} />);


describe(`Render MovieCard`, () => {
  it(`Should match with snapshot`, () => {
    const movieCardSnapshot = renderer.create(
        <MovieCard {...promoMovie} />
    ).toJSON();

    expect(movieCardSnapshot).toMatchSnapshot();
  });


  it(`Should render correct promo-movie title`, () => {
    expect(movieCardElement.find(`div.movie-card__bg img`).prop(`alt`))
      .toEqual(promoMovie.title);

    expect(movieCardElement.find(`div.movie-card__poster img`).prop(`alt`))
      .toEqual(promoMovie.title);

    expect(movieCardElement.find(`h2.movie-card__title`).text())
      .toEqual(promoMovie.title);
  });


  it(`Should render correct promo-movie genre`, () => {
    expect(movieCardElement.find(`span.movie-card__genre`).text())
      .toEqual(promoMovie.genre);
  });


  it(`Should render correct promo-movie release date`, () => {
    expect(movieCardElement.find(`span.movie-card__year`).text())
      .toEqual(promoMovie.releaseDate.getFullYear().toString());
  });


  it(`Should render correct promo-movie poster`, () => {
    expect(movieCardElement.find(`div.movie-card__poster img`).prop(`src`))
      .toEqual(promoMovie.posterUrl);
  });


  it(`Should render correct movie card background`, () => {
    expect(movieCardElement.find(`div.movie-card__bg img`).prop(`src`))
      .toEqual(promoMovie.backgroundUrl);
  });
});
