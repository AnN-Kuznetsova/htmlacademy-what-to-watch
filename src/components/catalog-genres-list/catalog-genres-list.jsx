import PropTypes from "prop-types";
import React from "react";
import {CatalogGenresItem} from "../catalog-genres-item/catalog-genres-item.jsx";


const handleCatalogGenresLinkClick = (evt) => {
  evt.preventDefault();
  window.console.log(`CatalogGenresLinkClick`);
};


export const CatalogGenresList = (props) => {
  const {movieGenres} = props;

  return (
    <ul className="catalog__genres-list">
      {
        movieGenres.map((movieGenre, index) =>
          <CatalogGenresItem
            key={movieGenre + index}
            movieGenre={movieGenre}
            onCatalogGenresLinkClick={handleCatalogGenresLinkClick}
          />
        )
      }
    </ul>
  );
};


CatalogGenresList.propTypes = {
  movieGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
