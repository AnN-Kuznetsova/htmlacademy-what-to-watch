import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import {MovieCardFull} from "./movie-card-full.jsx";

import {mockPromoMovie} from "../../__test-data__/test-mocks.js";


global.window = Object.create(window);
Object.defineProperty(window, `location`, {
  value: {
    pathname: `/page-name`,
  }
});

const props = {
  movie: mockPromoMovie,
  renderVideoPlayer: () => {},
  isPlayerVisible: false,
  onPlayButtonClick: () => {},
};

const movieCardFullElement = shallow(<MovieCardFull {...props} />);


describe(`Render MovieCardFull`, () => {
  it(`Should match with snapshot`, () => {
    const movieCardFulSnapshot = renderer.create(
        <MovieCardFull {...props} />
    ).toJSON();

    expect(movieCardFulSnapshot).toMatchSnapshot();
  });


  it(`Should render correct movie title`, () => {
    expect(movieCardFullElement.find(`div.movie-card__bg img`).prop(`alt`))
      .toEqual(mockPromoMovie.title);

    expect(movieCardFullElement.find(`h2.movie-card__title`).text())
      .toEqual(mockPromoMovie.title);
  });


  it(`Should render correct movie genre`, () => {
    expect(movieCardFullElement.find(`span.movie-card__genre`).text())
      .toEqual(mockPromoMovie.genres[0]);
  });


  it(`Should render correct movie release date`, () => {
    expect(movieCardFullElement.find(`span.movie-card__year`).text())
      .toEqual(mockPromoMovie.releaseDate.getFullYear().toString());
  });


  it(`Should render correct movie page background`, () => {
    expect(movieCardFullElement.find(`div.movie-card__bg img`).prop(`src`))
      .toEqual(mockPromoMovie.backgroundUrl);
  });
});
