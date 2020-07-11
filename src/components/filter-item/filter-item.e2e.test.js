import React from "react";
import {shallow} from "enzyme";

import {FilterItem} from "./filter-item.jsx";


const onClick = jest.fn();

const props = {
  filterName: ``,
  onClick,
};

const filterItemElement = shallow(<FilterItem {...props} />);


describe(`FilterItem e2e-tests`, () => {
  it(`Filter item should be pressed`, () => {
    const linkElement = filterItemElement.find(`a.catalog__genres-link`);
    linkElement.simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
