import PropTypes from "prop-types";
import React from "react";
import {GenresItem} from "../genres-item/genres-item.jsx";
import {MoviePropType} from "../../prop-types.js";
import {SmallMovieCard} from "../small-movie-card/small-movie-card.jsx";
import {ShowMoreButton} from "../show-more-button/show-more-button.jsx";
import {genreNames} from "../../mocks/genre-names.js";


export const Catalog = (props) => {
  const {films, isMoviePage, onSmallMovieCardHover, onSmallMovieCardClick} = props;

  const handleGenreClick = () => {};

  const handleSmallMovieCardHover = (movie) => {
    onSmallMovieCardHover(movie);
  };

  const handleSmallMovieCardClick = () => {
    onSmallMovieCardClick();
  };

  const handleShowMoreButtonClick = () => {};

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      {!isMoviePage &&
        <ul className="catalog__genres-list">
          {
            genreNames.map((genreName, index) =>
              <GenresItem
                key={genreName + index}
                genreName={genreName}
                onClick={handleGenreClick}
              />
            )
          }
        </ul>}

      <div className="catalog__movies-list">
        {
          films.map((movie, index) =>
            <SmallMovieCard
              key={movie + index}
              movie={movie}
              onClick={handleSmallMovieCardClick}
              onHover={handleSmallMovieCardHover}
            />
          )
        }
      </div>

      {!isMoviePage && <ShowMoreButton onClick={handleShowMoreButtonClick} />}
    </section>
  );
};


Catalog.propTypes = {
  films: PropTypes.arrayOf(MoviePropType).isRequired,
  isMoviePage: PropTypes.bool.isRequired,
  onSmallMovieCardHover: PropTypes.func.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
};
