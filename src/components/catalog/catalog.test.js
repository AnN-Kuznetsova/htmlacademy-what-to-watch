import React from "react";
import renderer from "react-test-renderer";
import {Catalog} from "./catalog.jsx";
import {films} from "../../__test-data__/test-mocks.js";


const props = {
  films,
  isMoviePage: false,
  onSmallMovieCardHover: () => {},
  onSmallMovieCardClick: () => {},
};


describe(`Render Catalog`, () => {
  it(`Should match with snapshot in MainPage`, () => {
    const catalogSnapshot = renderer.create(
        <Catalog {...props} />
    ).toJSON();

    expect(catalogSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot in MoviePage`, () => {
    props.isMoviePage = true;
    const catalogSnapshot = renderer.create(
        <Catalog {...props} />
    ).toJSON();

    expect(catalogSnapshot).toMatchSnapshot();
  });
});
