import React, {PureComponent} from 'react';
import {CatalogFilter} from '../../components/catalog-filter/catalog-filter.jsx';


export const withFilter = (Component) => {
  class WithFilter extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        filterType: null,
        activeFilter: null,
      };

      this.renderFilter = this.renderFilter.bind(this);
    }

    renderFilter(filterType, filterNames) {
      this.setState({
        filterType,
      });

      return (
        <CatalogFilter
          filterNames={filterNames}
        />
      );
    }

    render() {
      return (
        <Component
          {...this.props}
          renderFilter={this.renderFilter}
        />
      );
    }
  }


  WithFilter.propTypes = {};


  return WithFilter;
};
