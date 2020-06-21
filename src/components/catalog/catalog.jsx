import PropTypes from "prop-types";
import React from "react";
import {GenresItem} from "../genres-item/genres-item.jsx";
import {MoviePropType} from "../../prop-types.js";
import {ShowMoreButton} from "../show-more-button/show-more-button.jsx";
import {SmallMovieCard} from "../small-movie-card/small-movie-card.jsx";
import {genreNames} from "../../mocks/genre-names.js";


const handleGenreClick = () => {};

const handleSmallMovieCardClick = () => {};

const handleSmallMovieCardHover = () => {};

const handleShowMoreButtonClick = () => {};


export const Catalog = (props) => {
  const {films} = props;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

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
      </ul>

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

      <ShowMoreButton onClick={handleShowMoreButtonClick} />
    </section>
  );
};


Catalog.propTypes = {
  films: PropTypes.arrayOf(MoviePropType).isRequired,
};
