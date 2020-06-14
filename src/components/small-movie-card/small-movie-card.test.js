import React from "react";
import renderer from "react-test-renderer";
import {CatalogMoviesCard} from "./catalog-movies-card.jsx";


const props = {
  movieTitle: `Aviator`,
};


describe(`Render CatalogMoviesCard`, () => {
  it(`Render correctly CatalogMoviesCard component`, () => {
    const catalogMoviesCardComponent = renderer.create(
        <CatalogMoviesCard {...props} />
    ).toJSON();

    expect(catalogMoviesCardComponent).toMatchSnapshot();
  });
});
