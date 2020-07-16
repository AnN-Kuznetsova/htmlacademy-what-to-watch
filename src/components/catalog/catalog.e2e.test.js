import React from "react";
import {mount} from "enzyme";

import {CatalogComponent} from "./catalog.jsx";

import {mockMovies} from "../../__test-data__/test-mocks.js";


const mockEvent = {
  preventDefault() {}
};

let visibleCardCount = 1;

const onSmallMovieCardClick = jest.fn();
const onShowMoreButtonClick = jest.fn(() => {
  visibleCardCount += 8;
  catalogElement.setProps({visibleCardCount});
});

const props = {
  movieList: mockMovies,
  visibleCardCount,
  onSmallMovieCardClick,
  onShowMoreButtonClick,
};

const catalogElement = mount(<CatalogComponent {...props} />);
const smallMovieCardElement = [...catalogElement.find(`article.small-movie-card`)][0];


describe(`Catalog e2e-tests`, () => {
  it(`Should small movie card be pressed`, () => {
    smallMovieCardElement.props.onClick(mockEvent);

    expect(onSmallMovieCardClick).toHaveBeenCalledTimes(1);
  });


  it(`Clicking on the ShowMoreButton should increment visible small movie card count`, () => {
    catalogElement.find(`button.catalog__button`).simulate(`click`);

    expect(onShowMoreButtonClick).toHaveBeenCalledTimes(1);
    expect(catalogElement.props().visibleCardCount).toEqual(9);
  });
});
