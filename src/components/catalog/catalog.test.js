import React from "react";
import renderer from "react-test-renderer";
import {Catalog} from "./catalog.jsx";
import {PageType} from "../../const.js";
import {films} from "../../__test-data__/test-mocks.js";


const props = {
  films,
  activePage: PageType.MAIN_INDEX,
  onSmallMovieCardHover: () => {},
  onSmallMovieCardClick: () => {},
};


describe(`Render Catalog`, () => {
  it(`Should match with snapshot when active page is MAIN_INDEX`, () => {
    const catalogSnapshot = renderer.create(
        <Catalog {...props} />
    ).toJSON();

    expect(catalogSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when active page is MAIN_MOVIE_DETAILS`, () => {
    props.activePage = PageType.MAIN_MOVIE_DETAILS;

    const catalogSnapshot = renderer.create(
        <Catalog {...props} />
    ).toJSON();

    expect(catalogSnapshot).toMatchSnapshot();
  });
});
