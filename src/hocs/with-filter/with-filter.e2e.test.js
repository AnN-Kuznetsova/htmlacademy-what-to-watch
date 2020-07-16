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
const componentWithFilterInstance = componentWithFilterElement.instance();


describe(`withFilter e2e-tests`, () => {
  it(`Should pass the correct props to the "renderFilter"`, () => {
    const filterNames = [`One`, `Two`, `Three`];
    const onClick = jest.fn();
    const activeFilter = `Two`;

    const spyOnRenderFilter = jest.spyOn(componentWithFilterInstance, `renderFilter`);

    const filter = spyOnRenderFilter.call(componentWithFilterInstance, filterNames, onClick, activeFilter);

    expect(filter.props.children.map((child) => child.props.filterName))
      .toEqual([`One`, `Two`, `Three`], onClick, `Two`);
    expect(filter.props.children[0].props).toEqual({
      filterName: `One`,
      onClick,
      isActive: false,
    });
    expect(filter.props.children[1].props).toEqual({
      filterName: `Two`,
      onClick,
      isActive: true,
    });
    expect(filter.props.children[2].props).toEqual({
      filterName: `Three`,
      onClick,
      isActive: false,
    });
  });
});
