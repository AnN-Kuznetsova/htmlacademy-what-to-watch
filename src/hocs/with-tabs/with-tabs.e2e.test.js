import PropTypes from "prop-types";
import React from "react";
import {mount} from "enzyme";

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
const componentWithTabsElement = mount(<ComponentWithTabs />);

describe(`withTabs e2e-tests`, () => {
  it(`The default state is correct`, () => {
    expect(componentWithTabsElement.instance().state.activeTabId).toEqual(0);
    expect(componentWithTabsElement.find(`a.movie-nav__link`).at(0).props().className)
      .toEqual(expect.stringContaining(`movie-nav__item--active`));
    expect(componentWithTabsElement.find(`div.tab-content 1`)).toBeTruthy();
    expect(componentWithTabsElement.find(`div.tab-content 2`)).toBeFalse();
    expect(componentWithTabsElement.find(`div.tab-content 3`)).toBeFalse();
  });


  it(`Clicking on tab header should set the correct state and render correct tab content`, () => {
    const secondTabHeader = componentWithTabsElement.find(`a.movie-nav__link`).at(1);
    secondTabHeader.simulate(`click`);

    expect(componentWithTabsElement.instance().state.activeTabId).toEqual(1);
    expect(componentWithTabsElement.find(`a.movie-nav__link`).at(1).props().className)
      .toEqual(expect.stringContaining(`movie-nav__item--active`));
    expect(componentWithTabsElement.find(`div.tab-content 1`)).toBeFalse();
    expect(componentWithTabsElement.find(`div.tab-content 2`)).toBeTruthy();
    expect(componentWithTabsElement.find(`div.tab-content 3`)).toBeFalse();
  });
});
