import PropTypes from "prop-types";
import React from "react";


export const CatalogGenresItem = (props) => {
  const {genreName, onGenreClick} = props;

  return (
    <li className="catalog__genres-item">
      <a
        href="#"
        className="catalog__genres-link"
        onClick={onGenreClick}
      >{genreName}</a>
    </li>
  );
};


CatalogGenresItem.propTypes = {
  genreName: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};
