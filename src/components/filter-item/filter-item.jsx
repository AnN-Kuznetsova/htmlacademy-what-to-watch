import PropTypes from "prop-types";
import React from "react";


export const FilterItem = (props) => {
  const {filterName, onClick} = props;

  return (
    <li className="catalog__genres-item">
      <a
        href="#"
        className="catalog__genres-link"
        onClick={onClick.bind(null, filterName)}
      >{filterName}</a>
    </li>
  );
};


FilterItem.propTypes = {
  filterName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
