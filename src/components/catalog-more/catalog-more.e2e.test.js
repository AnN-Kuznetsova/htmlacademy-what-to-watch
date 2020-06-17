import React from "react";
import {shallow} from "enzyme";
import {CatalogMore} from "./catalog-more.jsx";


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
