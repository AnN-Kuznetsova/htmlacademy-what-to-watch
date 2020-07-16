import React from "react";
import {mount} from "enzyme";

import {CatalogComponent} from "./catalog.jsx";

import {mockMovies} from "../../__test-data__/test-mocks.js";


const mockEvent = {
  preventDefault() {}
};

const onSmallMovieCardClick = jest.fn();

const props = {
  movies: [],
  movieList: mockMovies,
  onSmallMovieCardClick,
  renderFilter: () => {},
  activeFilter: ``,
  onGenreFilterClick: () => {},
};

const catalogElement = mount(<CatalogComponent {...props} />);
const smallMovieCardElement = [...catalogElement.find(`article.small-movie-card`)][0];


describe(`Catalog e2e-tests`, () => {
  it(`Should small movie card be pressed`, () => {
    smallMovieCardElement.props.onClick(mockEvent);

    expect(onSmallMovieCardClick).toHaveBeenCalled();
  });
});
