import PropTypes from "prop-types";
import React from "react";
import {GenresItem} from "../genres-item/genres-item.jsx";
import {ShowMoreButton} from "../show-more-button/show-more-button.jsx";
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

const handleShowMoreButtonClick = (event) => {
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
            <GenresItem
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
              onClick={handleSmallMovieCardClick}
            />
          )
        }
      </div>

      <ShowMoreButton onClick={handleShowMoreButtonClick} />
    </section>
  );
};


Catalog.propTypes = {
  movieTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
