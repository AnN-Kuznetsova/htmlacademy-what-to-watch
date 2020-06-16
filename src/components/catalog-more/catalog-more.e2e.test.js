import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";
import React from "react";
import {CatalogMore} from "./catalog-more.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


const onCatalogButtonClick = jest.fn();

const props = {
  onClick: onCatalogButtonClick,
};

const catalogMoreElement = shallow(<CatalogMore {...props} />);


describe(`CatalogMore e2e-tests`, () => {
  it(`Should catalog button be pressed`, () => {
    const catalogButtonElement = catalogMoreElement.find(`button.catalog__button`);
    catalogButtonElement.simulate(`click`);
    expect(onCatalogButtonClick).toHaveBeenCalled();
  });
});
