import React from "react";
import {mount} from "enzyme";

import {MovieDetailsPage} from "./movie-details-page";

import {promoMovie} from "../../__test-data__/test-mocks.js";


const mockEvent = {
  preventDefault() {}
};

const onSmallMovieCardClick = jest.fn();

const props = {
  activeMovie: promoMovie,
  onSmallMovieCardClick,
};

const movieDetailsPageElement = mount(<MovieDetailsPage {...props} />);


describe(`MovieDetailsPage e2e-tests`, () => {
  it(`Should small movie card in catalog be pressed`, () => {
    const catalogElement = movieDetailsPageElement.find(`section.catalog`);
    const smallMovieCardElement = [...catalogElement.find(`article.small-movie-card`)][0];

    smallMovieCardElement.props.onClick(mockEvent);

    expect(onSmallMovieCardClick).toHaveBeenCalled();
  });
});
