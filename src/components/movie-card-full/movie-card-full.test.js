import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import {MovieCardFull} from "./movie-card-full.jsx";

import {promoMovie} from "../../__test-data__/test-mocks.js";


global.window = Object.create(window);
Object.defineProperty(window, `location`, {
  value: {
    pathname: `/page-name`,
  }
});

const movieCardFullElement = shallow(<MovieCardFull movie={promoMovie} />);


describe(`Render MovieCardFull`, () => {
  it(`Should match with snapshot`, () => {
    const movieCardFulSnapshot = renderer.create(
        <MovieCardFull movie={promoMovie} />
    ).toJSON();

    expect(movieCardFulSnapshot).toMatchSnapshot();
  });


  it(`Should render correct movie title`, () => {
    expect(movieCardFullElement.find(`div.movie-card__bg img`).prop(`alt`))
      .toEqual(promoMovie.title);

    expect(movieCardFullElement.find(`h2.movie-card__title`).text())
      .toEqual(promoMovie.title);
  });


  it(`Should render correct movie genre`, () => {
    expect(movieCardFullElement.find(`span.movie-card__genre`).text())
      .toEqual(promoMovie.genres[0]);
  });


  it(`Should render correct movie release date`, () => {
    expect(movieCardFullElement.find(`span.movie-card__year`).text())
      .toEqual(promoMovie.releaseDate.getFullYear().toString());
  });


  it(`Should render correct movie page background`, () => {
    expect(movieCardFullElement.find(`div.movie-card__bg img`).prop(`src`))
      .toEqual(promoMovie.backgroundUrl);
  });
});
