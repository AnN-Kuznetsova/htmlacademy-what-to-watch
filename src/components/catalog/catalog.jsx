import PropTypes from "prop-types";
import React from "react";
import {CatalogGenresItem} from "../catalog-genres-item/catalog-genres-item.jsx";
import {CatalogMore} from "../catalog-more/catalog-more.jsx";
import {SmallMovieCard} from "../small-movie-card/small-movie-card.jsx";


const genreNames = [
  `All genres`,
  `Comedies`,
  `Crime`,
  `Documentary`,
  `Dramas`,
  `Horror`,
  `Kids & Family`,
  `Romance`,
  `Sci-Fi`,
  `Thrillers`,
];

const handleGenreClick = (event) => {
  event.preventDefault();
};

const handleSmallMovieCardClick = (event) => {
  event.preventDefault();
};

const handleCatalogButtonClick = (event) => {
  event.preventDefault();
};


export const Catalog = (props) => {
  const {movieTitles} = props;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

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

      <div className="catalog__movies-list">
        {
          movieTitles.map((movieTitle, index) =>
            <SmallMovieCard
              key={movieTitle + index}
              movieTitle={movieTitle}
              onSmallMovieCardClick={handleSmallMovieCardClick}
            />
          )
        }
      </div>

      <CatalogMore onClick={handleCatalogButtonClick} />
    </section>
  );
};


Catalog.propTypes = {
  movieTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
