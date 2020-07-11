import React, {PureComponent} from 'react';


export const withTabs = (Component) => {
  class WithTabs extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTabId: 0,
      };

      this.renderTab = this.renderTab.bind(this);
      this.renderTabNav = this.renderTabNav.bind(this);
    }

    renderTabNav(tabNames) {
      const {activeTabId} = this.state;

      return (
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {tabNames.map((tabName, index) => (
              <li key={tabName + index} className={`movie-nav__item ${index === activeTabId ? `movie-nav__item--active` : ``}`}>
                <a href="#" className="movie-nav__link">{tabName}</a>
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
          <TabComponent key={key} {...props} />
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


  WithTabs.propTypes = {};


  return WithTabs;
};
