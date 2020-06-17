import React from "react";
import {shallow} from "enzyme";
import {ShowMoreButton} from "./show-more-button.jsx";


const onCatalogButtonClick = jest.fn();

const props = {
  onClick: onCatalogButtonClick,
};

const showMoreButtonElement = shallow(<ShowMoreButton {...props} />);


describe(`ShowMoreButton e2e-tests`, () => {
  it(`Should catalog button be pressed`, () => {
    const catalogButtonElement = showMoreButtonElement.find(`button.catalog__button`);
    catalogButtonElement.simulate(`click`);
    expect(onCatalogButtonClick).toHaveBeenCalled();
  });
});
