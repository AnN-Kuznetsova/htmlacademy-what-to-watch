import React from "react";
import renderer from "react-test-renderer";
import {CatalogMoviesList} from "./catalog-movies-list.jsx";


const props = {
  movieTitles: [
    `Fantastic Beasts: The Crimes of Grindelwald`,
    `Bohemian Rhapsody`,
    `Macbeth`,
    `Aviator`,
    `We need to talk about Kevin`,
    `What We Do in the Shadows`,
    `Revenant`,
    `Johnny English`,
    `Shutter Island`,
    `Pulp Fiction`,
    `No Country for Old Men`,
    `Snatch`,
    `Moonrise Kingdom`,
    `Seven Years in Tibet`,
    `Midnight Special`,
    `War of the Worlds`,
    `Dardjeeling Limited`,
    `Orlando`,
    `Mindhunter`,
    `Midnight Special`,
  ],
};


describe(`Render CatalogMoviesList`, () => {
  it(`Should match with snapshot`, () => {
    const catalogMoviesListSnapshot = renderer.create(
        <CatalogMoviesList {...props} />
    ).toJSON();

    expect(catalogMoviesListSnapshot).toMatchSnapshot();
  });
});
