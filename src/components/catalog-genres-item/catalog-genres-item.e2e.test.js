import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";
import React from "react";
import {CatalogGenresItem} from "./catalog-genres-item.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


const onCatalogGenresLinkClick = jest.fn();

const props = {
  movieGenre: `Kids & Family`,
  onCatalogGenresLinkClick,
};

const catalogGenresItemElement = shallow(<CatalogGenresItem {...props} />);


describe(`CatalogGenresItem e2e-tests`, () => {
  it(`Should movie genre link be pressed`, () => {
    const catalogGenresLinkElement = catalogGenresItemElement.find(`a.catalog__genres-link`);
    catalogGenresLinkElement.simulate(`click`);
    expect(onCatalogGenresLinkClick).toHaveBeenCalled();
  });
});
