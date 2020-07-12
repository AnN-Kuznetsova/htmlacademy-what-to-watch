import React from "react";
import {mount} from "enzyme";

import {Catalog} from "./catalog.jsx";

import {movies} from "../../__test-data__/test-mocks.js";


const mockEvent = {
  preventDefault() {}
};

const onSmallMovieCardClick = jest.fn();

const props = {
  movies,
  onSmallMovieCardClick,
  renderFilter: () => {},
};

const catalogElement = mount(<Catalog {...props} />);
const smallMovieCardElement = [...catalogElement.find(`article.small-movie-card`)][0];


describe(`Catalog e2e-tests`, () => {
  it(`Should small movie card be pressed`, () => {
    smallMovieCardElement.props.onClick(mockEvent);

    expect(onSmallMovieCardClick).toHaveBeenCalled();
  });
});
