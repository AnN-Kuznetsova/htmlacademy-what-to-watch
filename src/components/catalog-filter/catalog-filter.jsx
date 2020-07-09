import PropTypes from "prop-types";
import React from "react";
import {FilterItem} from "../filter-item/filter-item.jsx";


export const FilterType = {
  GENRE: `genre`,
};


export const CatalogFilter = (props) => {
  const {filterNames} = props;

  const handleGenreClick = () => {};

  return (
    <ul className="catalog__genres-list">
      {
        filterNames.map((filterName, index) =>
          <FilterItem
            key={filterName + index}
            filterName={filterName}
            onClick={handleGenreClick}
          />
        )
      }
    </ul>
  );
};


CatalogFilter.propTypes = {
  filterNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};
