import React from "react";
import renderer from "react-test-renderer";
import {CatalogGenresList} from "./catalog-genres-list.jsx";


const movieGenres = [
  `All genres`,
  `Comedies`,
  `Crime`,
  `Documentary`,
  `Dramas`,
  `Horror`,
  `Kids & Family`,
  `Romance`,
  `Sci-Fi`,
  `Thrillers`,
];

const props = {
  movieGenres,
};


describe(`Render CatalogGenresList`, () => {
  it(`Should match with snapshot`, () => {
    const catalogGenresListSnapshot = renderer.create(
        <CatalogGenresList {...props} />
    ).toJSON();

    expect(catalogGenresListSnapshot).toMatchSnapshot();
  });
});
