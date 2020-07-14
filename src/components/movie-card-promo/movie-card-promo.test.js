import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import {MovieCardPromo} from "./movie-card-promo";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


const props = {
  movie: mockPromoMovie,
  onMovieClick: () => {},
};

const movueCardPromoElement = shallow(<MovieCardPromo {...props} />);

describe(`Render MovieCardPromo`, () => {
  it(`Should match with snapshot`, () => {
    const movieCardPromoSnapshot = renderer.create(
        <MovieCardPromo {...props} />
    ).toJSON();

    expect(movieCardPromoSnapshot).toMatchSnapshot();
  });


  it(`Should render correct promo-movie title`, () => {
    expect(movueCardPromoElement.find(`div.movie-card__bg img`).prop(`alt`))
      .toEqual(mockPromoMovie.title);

    expect(movueCardPromoElement.find(`div.movie-card__poster img`).prop(`alt`))
      .toEqual(mockPromoMovie.title);

    expect(movueCardPromoElement.find(`h2.movie-card__title`).text())
      .toEqual(mockPromoMovie.title);
  });


  it(`Should render correct promo-movie genre`, () => {
    expect(movueCardPromoElement.find(`span.movie-card__genre`).text())
      .toEqual(mockPromoMovie.genres[0]);
  });


  it(`Should render correct promo-movie release date`, () => {
    expect(movueCardPromoElement.find(`span.movie-card__year`).text())
      .toEqual(mockPromoMovie.releaseDate.getFullYear().toString());
  });


  it(`Should render correct promo-movie poster`, () => {
    expect(movueCardPromoElement.find(`div.movie-card__poster img`).prop(`src`))
      .toEqual(mockPromoMovie.posterUrl);
  });


  it(`Should render correct movie card background`, () => {
    expect(movueCardPromoElement.find(`div.movie-card__bg img`).prop(`src`))
      .toEqual(mockPromoMovie.backgroundUrl);
  });
});
