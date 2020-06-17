import React from "react";
import {shallow} from "enzyme";
import {CatalogGenresItem} from "./catalog-genres-item.jsx";
import {genreName} from "../../__test-data__/test-mocks.js";


const onGenreClick = jest.fn();

const props = {
  genreName,
  onGenreClick,
};

const catalogGenresItemElement = shallow(<CatalogGenresItem {...props} />);


describe(`CatalogGenresItem e2e-tests`, () => {
  it(`Should movie genre link be pressed`, () => {
    const catalogGenresLinkElement = catalogGenresItemElement.find(`a.catalog__genres-link`);
    catalogGenresLinkElement.simulate(`click`);
    expect(onGenreClick).toHaveBeenCalled();
  });
});
