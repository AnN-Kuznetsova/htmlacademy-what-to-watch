import React from "react";
import {mount} from "enzyme";

import {FilterByGenreComponent} from "./filter-by-genre";

import {mockMovies} from "../../__test-data__/test-mocks";


let activeFilter = `All genres`;

const onClick = jest.fn((newActiveFilter) => {
  activeFilter = newActiveFilter;
  filterByGenreElement.setProps({activeFilter});
});

const props = {
  movies: mockMovies,
  activeFilter,
  onClick,
};

const filterByGenreElement = mount(<FilterByGenreComponent {...props} />);


describe(`FilterByGenre e2e-tests`, () => {
  it(`Clicking on the filter item should trigger a callback and change active filter`, () => {
    const filterItemTwo = filterByGenreElement.find(`a.catalog__genres-link`).at(1);
    filterItemTwo.simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(filterByGenreElement.props().activeFilter).toEqual(`Drama`);
  });
});
