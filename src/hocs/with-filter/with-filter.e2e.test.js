import React from "react";
import {mount} from "enzyme";

import {withFilter} from "./with-filter";


const Component = () => {
  return (
    <div />
  );
};

const ComponentWithFilter = withFilter(Component, `filter-type`);
const componentWithFilterElement = mount(<ComponentWithFilter />);
const componentWithFilterElementInstance = componentWithFilterElement.instance();


describe(`withFilter e2e-tests`, () => {
  it(`Set correct filter type`, () => {
    expect(componentWithFilterElementInstance.state.filterType).toEqual(`filter-type`);
  });


  it(`Should pass the correct props to the "renderFilter"`, () => {
    const filterNames = [`One`, `Two`, `Three`];
    const spyOnRenderFilter = jest.spyOn(componentWithFilterElementInstance, `renderFilter`);

    const filter = spyOnRenderFilter.call(componentWithFilterElementInstance, filterNames);

    expect(filter.props.children.map((child) => child.props.filterName))
      .toEqual([`One`, `Two`, `Three`]);
  });
});
