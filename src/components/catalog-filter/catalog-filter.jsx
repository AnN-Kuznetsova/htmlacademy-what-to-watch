import PropTypes from "prop-types";
import React from "react";
import {GenresItem} from "../genres-item/genres-item.jsx";


export const CatalogFilter = (props) => {
  const {filterNames} = props;

  const handleGenreClick = () => {};

  return (
    <ul className="catalog__genres-list">
      {
        filterNames.map((filterName, index) =>
          <GenresItem
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
