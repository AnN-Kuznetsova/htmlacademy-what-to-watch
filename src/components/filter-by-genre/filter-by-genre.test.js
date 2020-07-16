import React from "react";
import renderer from "react-test-renderer";

import {FilterByGenreComponent} from "./filter-by-genre";

import {mockMovies} from "../../__test-data__/test-mocks";


const props = {
  movies: mockMovies,
  activeFilter: `All genres`,
  onClick: () => {},
};


describe(`Render FilterByGenre`, () => {
  it(`FilterByGenre should match with snapshot`, () => {
    const filterByGenreSnapshot = renderer.create(
        <FilterByGenreComponent {...props} />
    ).toJSON();

    expect(filterByGenreSnapshot).toMatchSnapshot();
  });
});
