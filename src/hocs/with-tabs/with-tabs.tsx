import * as React from 'react';
import {Subtract} from "utility-types";


interface State {
  activeTabId: number;
}

interface InjectingProps {
  renderTabNav: (tabNames: string[]) => React.ReactNode;
  renderTab: (tabId: number, TabComponent: React.FunctionComponent, props: object, key: string) => React.ReactNode;
}

export const withTabs = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithTabs extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeTabId: 0,
      };

      this.renderTab = this.renderTab.bind(this);
      this.renderTabNav = this.renderTabNav.bind(this);
    }

    handleTabHeaderClick(tabId) {
      this.setState({
        activeTabId: tabId,
      });
    }

    renderTabNav(tabNames) {
      const {activeTabId} = this.state;

      return (
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {tabNames.map((tabName, index) => (
              <li key={tabName + index} className={`movie-nav__item ${index === activeTabId ? `movie-nav__item--active` : ``}`}>
                <a
                  href="#"
                  className="movie-nav__link"
                  onClick={this.handleTabHeaderClick.bind(this, index)}
                >{tabName}</a>
              </li>
            ))}
          </ul>
        </nav>
      );
    }

    renderTab(tabId, TabComponent, props, key) {
      const {activeTabId} = this.state;

      if (tabId === activeTabId) {
        return (
          <TabComponent
            {...props}
            key={key}
          />
        );
      }

      return null;
    }

    render() {
      return <Component
        {...this.props}
        renderTabNav={this.renderTabNav}
        renderTab={this.renderTab}
      />;
    }
  }


  return WithTabs;
};
