import * as React from "react";
import * as renderer from "react-test-renderer";
import {shallow} from "enzyme";

import {FilterItem} from "./filter-item";
import {noop} from "../../utils/utils";


const filterNames = [
  `All genres`,
  `Comedies`,
  `Crime`,
  `Documentary`,
];

const props = {
  filterName: filterNames[2],
  onClick: noop,
  isActive: false,
};

const filterItemElement = shallow(<FilterItem {...props} />);


describe(`Render FilterItem`, () => {
  it(`Should match with snapshot when isActive is false`, () => {
    const genresItemSnapshot = renderer.create(
        <FilterItem {...props} />
    ).toJSON();

    expect(genresItemSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when isActive is true`, () => {
    props.isActive = true;

    const genresItemSnapshot = renderer.create(
        <FilterItem {...props} />
    ).toJSON();

    expect(genresItemSnapshot).toMatchSnapshot();
  });


  it(`Should render correct filter name`, () => {
    expect(filterItemElement.find(`a.catalog__genres-link`).text())
      .toEqual(`Crime`);
  });
});
