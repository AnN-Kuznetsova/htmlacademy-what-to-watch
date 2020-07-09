import PropTypes from "prop-types";
import React from "react";


export const FilterItem = (props) => {
  const {filterName, onClick} = props;

  const handleClick = () => {
    onClick(filterName);
  };

  return (
    <li className="catalog__genres-item">
      <a
        href="#"
        className="catalog__genres-link"
        onClick={handleClick}
      >{filterName}</a>
    </li>
  );
};


FilterItem.propTypes = {
  filterName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
