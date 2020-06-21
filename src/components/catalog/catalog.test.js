import React from "react";
import renderer from "react-test-renderer";
import {Catalog} from "./catalog.jsx";
import {movieTitles} from "../../__test-data__/test-mocks.js";


describe(`Render Catalog`, () => {
  it(`Should match with snapshot`, () => {
    const catalogSnapshot = renderer.create(
        <Catalog movieTitles={movieTitles} />
    ).toJSON();

    expect(catalogSnapshot).toMatchSnapshot();
  });
});
