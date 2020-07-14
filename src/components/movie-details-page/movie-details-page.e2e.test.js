import React from "react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {mount} from "enzyme";

import {MovieDetailsPage} from "./movie-details-page";

import {promoMovie, movies as mockMovies} from "../../__test-data__/test-mocks.js";


const mockStore = configureStore([]);

const mockEvent = {
  preventDefault() {}
};

const onSmallMovieCardClick = jest.fn();

const props = {
  activeMovie: promoMovie,
  onSmallMovieCardClick,
};

const store = mockStore({
  movies: [],
  movieList: mockMovies,
  genre: ``,
});

const movieDetailsPageElement = mount(
    <Provider store={store}>
      <MovieDetailsPage {...props} />
    </Provider>
);


describe(`MovieDetailsPage e2e-tests`, () => {
  it(`Should small movie card in catalog be pressed`, () => {
    const catalogElement = movieDetailsPageElement.find(`section.catalog`);
    const smallMovieCardElement = [...catalogElement.find(`article.small-movie-card`)][0];

    smallMovieCardElement.props.onClick(mockEvent);

    expect(onSmallMovieCardClick).toHaveBeenCalled();
  });
});
