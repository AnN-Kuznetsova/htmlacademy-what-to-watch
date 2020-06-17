import PropTypes from "prop-types";
import React from "react";
import {CatalogGenresItem} from "../catalog-genres-item/catalog-genres-item.jsx";


const handleGenreClick = (evt) => {
  evt.preventDefault();
  window.console.log(`CatalogGenresLinkClick`);
};


export const CatalogGenresList = (props) => {
  const {genreNames} = props;

  return (
    <ul className="catalog__genres-list">
      {
        genreNames.map((genreName, index) =>
          <CatalogGenresItem
            key={genreName + index}
            genreName={genreName}
            onGenreClick={handleGenreClick}
          />
        )
      }
    </ul>
  );
};


CatalogGenresList.propTypes = {
  genreNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};
