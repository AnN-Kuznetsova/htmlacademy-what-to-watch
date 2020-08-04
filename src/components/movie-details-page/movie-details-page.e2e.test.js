import React from "react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import {mount} from "enzyme";

import {AuthorizationStatus} from "../../reducers/user/user";
import {MovieDetailsPage} from "./movie-details-page";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../const";
import {history} from "../../history";

import {mockPromoMovie, mockMovies} from "../../__test-data__/test-mocks";


const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    movies: mockMovies,
  },
  [NameSpace.APPLICATION]: {
    genre: `All genres`,
    visibleMoviesCount: 8,
    activeMovie: mockPromoMovie,
    activePage: PageType.MOVIE_DETAILS,
    prevPage: ``,
    playerStartTime: 0,
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

const onSmallMovieCardClick = jest.fn();

const props = {
  activeMovie: mockPromoMovie,
  authorizationStatus: AuthorizationStatus.AUTH,
  onSmallMovieCardClick,
  onAddReviewButtonClick: () => {},
};

const movieDetailsPageElement = mount(
    <Router history={history} >
      <Provider store={store}>
        <MovieDetailsPage {...props} />
      </Provider>
    </Router>
);


describe(`MovieDetailsPage e2e-tests`, () => {
  it(`Should small movie card in catalog be pressed`, () => {
    const catalogElement = movieDetailsPageElement.find(`section.catalog`);
    [...catalogElement.find(`Link`)][0].props.onClick();
    [...catalogElement.find(`Link`)][1].props.onClick();

    expect(onSmallMovieCardClick).toHaveBeenCalledTimes(2);
  });
});
