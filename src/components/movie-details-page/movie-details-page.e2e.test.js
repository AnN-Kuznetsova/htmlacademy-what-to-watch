import React from "react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {mount} from "enzyme";

import {AuthorizationStatus} from "../../reducers/user/user";
import {MovieDetailsPage} from "./movie-details-page";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../const";

import {mockPromoMovie, mockMovies} from "../../__test-data__/test-mocks";


const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    movies: mockMovies,
  },
  [NameSpace.APPLICATION]: {
    genre: `All genres`,
    visibleMoviesCount: 8,
    activePage: PageType.MOVIE_DETAILS,
    prevPage: ``,
    playerStartTime: 0,
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
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
