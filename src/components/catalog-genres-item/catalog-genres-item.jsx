import PropTypes from "prop-types";
import React from "react";


export const CatalogGenresItem = (props) => {
  const {movieGenre, onCatalogGenresLinkClick} = props;

  return (
    <li className="catalog__genres-item">
      <a
        href="#"
        className="catalog__genres-link"
        onClick={onCatalogGenresLinkClick}
      >{movieGenre}</a>
    </li>
  );
};


CatalogGenresItem.propTypes = {
  movieGenre: PropTypes.string.isRequired,
  onCatalogGenresLinkClick: PropTypes.func.isRequired,
};
