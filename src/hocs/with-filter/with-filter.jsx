import React, {PureComponent} from 'react';
import {FilterItem} from '../../components/filter-item/filter-item';


export const withFilter = (Component/* , filterType */) => {
  class WithFilter extends PureComponent {
    /* constructor(props) {
      super(props);

      this.state = {
        filterType,
        activeFilter: null,
      };

      this.renderFilter = this.renderFilter.bind(this);
      this.handleFilterItemClick = this.handleFilterItemClick.bind(this);
    }

    handleFilterItemClick() {} */

    renderFilter(filterNames, onClick, activeFilter) {
      return (
        <ul className="catalog__genres-list">
          {
            filterNames.map((filterName, index) =>
              <FilterItem
                key={filterName + index}
                filterName={filterName}
                onClick={onClick} //{this.handleFilterItemClick}
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
