import React from "react";
import renderer from "react-test-renderer";
import {Catalog} from "./catalog.jsx";
import {films} from "../../__test-data__/test-mocks.js";


const props = {
  films,
  onSmallMovieCardHover: () => {},
  onSmallMovieCardClick: () => {},
};


describe(`Render Catalog`, () => {
  it(`Should match with snapshot`, () => {
    const catalogSnapshot = renderer.create(
        <Catalog {...props} />
    ).toJSON();

    expect(catalogSnapshot).toMatchSnapshot();
  });
});
