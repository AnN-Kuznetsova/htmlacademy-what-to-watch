import React from "react";
import {shallow} from "enzyme";

import {FilterItem} from "./filter-item.jsx";


const onClick = jest.fn();

const props = {
  filterName: `filter-name`,
  onClick,
  isActive: false,
};

const filterItemElement = shallow(<FilterItem {...props} />);


describe(`FilterItem e2e-tests`, () => {
  it(`Filter item should be pressed and pass the correct data to the callback`, () => {
    const linkElement = filterItemElement.find(`a.catalog__genres-link`);
    linkElement.simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0]).toEqual([`filter-name`]);
  });
});
