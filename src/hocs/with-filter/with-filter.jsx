import React, {PureComponent} from 'react';

import {FilterItem} from '../../components/filter-item/filter-item';


export const withFilter = (Component) => {
  class WithFilter extends PureComponent {

    renderFilter(filterNames, onClick, activeFilter) {
      return (
        <ul className="catalog__genres-list">
          {
            filterNames.map((filterName, index) =>
              <FilterItem
                key={filterName + index}
                filterName={filterName}
                onClick={onClick}
                isActive={filterName === activeFilter}
              />
            )
          }
        </ul>
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
