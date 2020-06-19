import {array, arrayOf, shape, string, instanceOf} from "prop-types";
import React from "react";
import {GenresItem} from "../genres-item/genres-item.jsx";
import {ShowMoreButton} from "../show-more-button/show-more-button.jsx";
import {SmallMovieCard} from "../small-movie-card/small-movie-card.jsx";
import {genreNames} from "../../mocks/genre-names.js";


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
            />
          )
        }
      </div>

      <ShowMoreButton onClick={handleShowMoreButtonClick} />
    </section>
  );
};


Catalog.propTypes = {
  films: arrayOf(shape({
    title: string.isRequired,
    smallPictureUrl: string.isRequired,
    backgroundUrl: string.isRequired,
    posterUrl: string.isRequired,
    genre: string.isRequired,
    releaseDate: instanceOf(Date).isRequired,
    description: string.isRequired,
    director: string.isRequired,
    starring: arrayOf(string).isRequired,
    runTime: string.isRequired,
    reviews: array.isRequired,
  })).isRequired,
};
