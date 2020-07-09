import PropTypes from "prop-types";
import React from "react";


export const GenresItem = (props) => {
  const {filterName, onClick} = props;

  return (
    <li className="catalog__genres-item">
      <a
        href="#"
        className="catalog__genres-link"
        onClick={onClick}
      >{filterName}</a>
    </li>
  );
};


GenresItem.propTypes = {
  filterName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
