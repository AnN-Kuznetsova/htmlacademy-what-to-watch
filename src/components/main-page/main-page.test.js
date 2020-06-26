import React from "react";
import renderer from "react-test-renderer";
import {MainPage} from "./main-page.jsx";
import {PageType} from "../../const.js";
import {promoMovie, films} from "../../__test-data__/test-mocks.js";


const props = {
  currentMovie: promoMovie,
  films,
  activePage: PageType.MAIN_INDEX,
  onSmallMovieCardHover: () => {},
  onSmallMovieCardClick: () => {},
  onCurrentMovieClick: () => {},
};


describe(`Render MainPage`, () => {
  it(`Should match with snapshot when active page is MAIN_INDEX`, () => {
    const mainPageSnapshot = renderer.create(
        <MainPage {...props} />
    ).toJSON();

    expect(mainPageSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when active page is MAIN_MOVIE_DETAILS`, () => {
    props.activePage = PageType.MAIN_MOVIE_DETAILS;

    const mainPageSnapshot = renderer.create(
        <MainPage {...props} />
    ).toJSON();

    expect(mainPageSnapshot).toMatchSnapshot();
  });
});
