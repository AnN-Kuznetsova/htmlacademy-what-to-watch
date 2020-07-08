import PropTypes from "prop-types";
import React from "react";
import {GenresItem} from "../genres-item/genres-item.jsx";
import {MoviePropType} from "../../prop-types.js";
import {PageType} from "../../const.js";
import {SmallMovieCard} from "../small-movie-card/small-movie-card.jsx";
import {ShowMoreButton} from "../show-more-button/show-more-button.jsx";
import {genreNames} from "../../mocks/genre-names.js";


export const Catalog = (props) => {
  const {films, activePage, onSmallMovieCardHover, onSmallMovieCardClick} = props;
  const isMainIndexPage = activePage === PageType.MAIN_INDEX;
  const isMainMovieDetailsPage = activePage === PageType.MAIN_MOVIE_DETAILS;

  const handleGenreClick = () => {};

  const handleSmallMovieCardHover = (movie) => {
    onSmallMovieCardHover(movie);
  };

  const handleSmallMovieCardClick = () => {
    onSmallMovieCardClick();
  };

  const handleShowMoreButtonClick = () => {};

  return (
    <section className={`catalog ${isMainMovieDetailsPage ? `catalog--like-this` : ``}`}>
      <h2 className={`catalog__title ${isMainIndexPage ? `visually-hidden` : ``}`}>
        {isMainMovieDetailsPage ? `More like this` : `Catalog`}
      </h2>

      {isMainIndexPage &&
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
              key={movie.title + index}
              movie={movie}
              onClick={handleSmallMovieCardClick}
              onHover={handleSmallMovieCardHover}
            />
          )
        }
      </div>

      {isMainIndexPage && <ShowMoreButton onClick={handleShowMoreButtonClick} />}
    </section>
  );
};


Catalog.propTypes = {
  films: PropTypes.arrayOf(MoviePropType).isRequired,
  activePage: PropTypes.string.isRequired,
  onSmallMovieCardHover: PropTypes.func.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
};
