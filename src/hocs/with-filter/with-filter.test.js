import React from "react";
import renderer from "react-test-renderer";

import {withFilter} from "./with-filter";


const Component = (props) => {
  return (
    <div {...props} />
  );
};

const ComponentWithFilter = withFilter(Component);


describe(`Render withFilter`, () => {
  it(`Should match with snapshot`, () => {
    const componentWithFilterSnapshot = renderer.create(
        <ComponentWithFilter />
    ).toJSON();

    expect(componentWithFilterSnapshot).toMatchSnapshot();
  });
});
