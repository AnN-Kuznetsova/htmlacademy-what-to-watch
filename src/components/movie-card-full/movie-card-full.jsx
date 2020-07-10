import React from "react";

import {MovieDetailsPageHeader} from "../movie-details-page-header/movie-details-page-header";
import {MoviePropType} from "../../prop-types";
import {
  getParticipantsLine,
  getFormattedScore,
  getRatingDescription,
} from "../../utils/utils";


export const MovieCardFull = (props) => {
  const {movie} = props;

  const scoreValue = getFormattedScore(movie.rating.score);
  const ratingDescription = getRatingDescription(movie.rating.score);

  const descriptionMarkup = movie.description.map((descriptionItem, index) =>
    <p key={descriptionItem + index}>{descriptionItem}</p>);

  return (
    <section className="movie-card movie-card--full">
      <MovieDetailsPageHeader
        movie={movie}
        onMovieClick={null}
      />

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={movie.posterUrl} alt={`${movie.title} poster`} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              <ul className="movie-nav__list">
                <li className="movie-nav__item movie-nav__item--active">
                  <a href="#" className="movie-nav__link">Overview</a>
                </li>
                <li className="movie-nav__item">
                  <a href="#" className="movie-nav__link">Details</a>
                </li>
                <li className="movie-nav__item">
                  <a href="#" className="movie-nav__link">Reviews</a>
                </li>
              </ul>
            </nav>

            <div className="movie-rating">
              <div className="movie-rating__score">{scoreValue}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{ratingDescription}</span>
                <span className="movie-rating__count">{movie.rating.totalVotes} ratings</span>
              </p>
            </div>

            <div className="movie-card__text">
              {descriptionMarkup}

              <p className="movie-card__director"><strong>Director: {getParticipantsLine(movie.directors)}</strong></p>

              <p className="movie-card__starring"><strong>Starring: {getParticipantsLine(movie.starring)}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


MovieCardFull.propTypes = {
  movie: MoviePropType.isRequired,
};
