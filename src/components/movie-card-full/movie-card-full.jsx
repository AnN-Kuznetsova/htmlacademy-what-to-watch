import React from "react";

import {Header} from "../header/header";
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
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={movie.backgroundUrl} alt={movie.title} />
        </div>

        <Header />

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2
              className="movie-card__title"
            >
              {movie.title}
            </h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{movie.genres[0]}</span>
              <span className="movie-card__year">{movie.releaseDate.getFullYear()}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s" />
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add" />
                </svg>
                <span>My list</span>
              </button>
              <a href="add-review.html" className="btn movie-card__button">Add review</a>
            </div>
          </div>
        </div>
      </div>

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
