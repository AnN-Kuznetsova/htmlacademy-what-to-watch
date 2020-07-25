import React from "react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {mount} from "enzyme";

import {MovieDetailsPage} from "./movie-details-page";
import {NameSpace} from "../../reducers/name-space";

import {mockPromoMovie, mockMovies} from "../../__test-data__/test-mocks";


const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    movies: mockMovies,
  },
  [NameSpace.APPLICATION]: {
    genre: `All genres`,
    visibleMoviesCount: 8,
    activePage: ``,
    prevPage: ``,
    playerStartTime: 0,
  },
});

const mockEvent = {
  preventDefault() {}
};

const onSmallMovieCardClick = jest.fn();

const props = {
  activeMovie: mockPromoMovie,
  onSmallMovieCardClick,
};

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
