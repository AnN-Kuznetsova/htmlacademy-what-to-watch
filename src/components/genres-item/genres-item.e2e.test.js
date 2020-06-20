import React from "react";
import {shallow} from "enzyme";
import {GenresItem} from "./genres-item.jsx";
import {genreNames} from "../../__test-data__/test-mocks.js";


const onClick = jest.fn();

const props = {
  genreName: genreNames[6],
  onClick,
};

const genresItemElement = shallow(<GenresItem {...props} />);


describe(`GenresItem e2e-tests`, () => {
  it(`Should movie genre link be pressed`, () => {
    const catalogGenresLinkElement = genresItemElement.find(`a.catalog__genres-link`);
    catalogGenresLinkElement.simulate(`click`);
    expect(onClick).toHaveBeenCalled();
  });
});
