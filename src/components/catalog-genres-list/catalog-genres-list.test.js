import React from "react";
import renderer from "react-test-renderer";
import {CatalogGenresList} from "./catalog-genres-list.jsx";


describe(`Render CatalogGenresList`, () => {
  it(`Should match with snapshot`, () => {
    const catalogGenresListSnapshot = renderer.create(
        <CatalogGenresList />
    ).toJSON();

    expect(catalogGenresListSnapshot).toMatchSnapshot();
  });
});
