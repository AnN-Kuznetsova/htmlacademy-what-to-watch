import React, {PureComponent} from 'react';
import {Filter} from '../../components/filter/filter.jsx';


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
        <Filter
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
