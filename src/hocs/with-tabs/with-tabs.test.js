import React from "react";
import renderer from "react-test-renderer";

import {withTabs} from "./with-tabs";


const Component = (props) => {
  return (
    <div {...props} />
  );
};

const ComponentWithTabs = withTabs(Component);

describe(`Render withTabs`, () => {
  it(`Should match with snapshot`, () => {
    const componentWithTabsSnapshot = renderer.create(
        <ComponentWithTabs />
    ).toJSON();

    expect(componentWithTabsSnapshot).toMatchSnapshot();
  });
});
