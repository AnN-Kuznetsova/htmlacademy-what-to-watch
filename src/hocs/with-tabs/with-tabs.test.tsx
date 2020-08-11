
import * as React from "react";
import * as renderer from "react-test-renderer";

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

const MockComponent = (props: MockComponentProps) => {
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

interface MockComponentProps {
  renderTabNav: (tabNames: string[]) => React.ReactNode;
  renderTab: (tabId: number, TabComponent: React.FunctionComponent, props: object, key: string) => React.ReactNode;
}

const ComponentWithTabs = withTabs(MockComponent);


describe(`Render withTabs`, () => {
  it(`Should match with snapshot`, () => {
    const componentWithTabsSnapshot = renderer.create(
        <ComponentWithTabs />
    ).toJSON();

    expect(componentWithTabsSnapshot).toMatchSnapshot();
  });
});
