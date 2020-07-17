import PropTypes from "prop-types";
import React from "react";
import renderer from "react-test-renderer";

import {withTabs} from "./with-tabs";


const tabList = [
  {
    name: `One`,
    // eslint-disable-next-line react/display-name
    component: () => <div className="tab-content 1" />,
  },
  {
    name: `Two`,
    // eslint-disable-next-line react/display-name
    component: () => <div className="tab-content 2" />,
  },
  {
    name: `Three`,
    // eslint-disable-next-line react/display-name
    component: () => <div className="tab-content 3" />,
  },
];

const Component = (props) => {
  const {renderTabNav, renderTab} = props;
  const tabNames = tabList.map((tab) => tab.name);

  return (
    <div>
      {renderTabNav(tabNames)}
      {renderTab(0, tabList[0].component, ({}), `content1`)}
      {renderTab(1, tabList[1].component, ({}), `content2`)}
      {renderTab(2, tabList[2].component, ({}), `content3`)}
    </div>
  );
};

Component.propTypes = {
  renderTabNav: PropTypes.func.isRequired,
  renderTab: PropTypes.func.isRequired,
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
