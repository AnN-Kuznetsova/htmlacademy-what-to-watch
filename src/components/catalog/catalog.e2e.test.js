import React from "react";
import {Catalog} from "./catalog.jsx";
import {PageType} from "../../const.js";
import {films} from "../../__test-data__/test-mocks.js";
import {mount} from "enzyme";


const mockEvent = {
  preventDefault() {}
};

const onSmallMovieCardHover = jest.fn();
const onSmallMovieCardClick = jest.fn();

const props = {
  films,
  activePage: PageType.MAIN_INDEX,
  onSmallMovieCardHover,
  onSmallMovieCardClick,
};

const catalogElement = mount(<Catalog {...props} />);
const smallMovieCardElement = [...catalogElement.find(`article.small-movie-card`)][0];


describe(`Catalog e2e-tests`, () => {
  it(`Should small movie card be pressed`, () => {
    smallMovieCardElement.props.onClick(mockEvent);

    expect(onSmallMovieCardClick).toHaveBeenCalled();
  });


  it(`Should small movie card be hover and pass to the callback the movie data from which was created`, () => {
    smallMovieCardElement.props.onMouseEnter(mockEvent);

    expect(onSmallMovieCardHover).toHaveBeenCalled();
    expect(onSmallMovieCardHover.mock.calls[0][0]).toMatchObject(films[0]);
  });
});
