import PropTypes from "prop-types";
import React from "react";
import {MoviePropType} from "../../prop-types";


export const MovieDetailsPageHeader = (props) => {
  const {movie, onMovieClick} = props;

  return (
    <div className="movie-card__hero">
      <div className="movie-card__bg">
        <img src={movie.backgroundUrl} alt={movie.title} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a href="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </div>
      </header>

      <div className="movie-card__wrap">
        <div className="movie-card__desc">
          <h2
            className="movie-card__title"
            onClick={onMovieClick}
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
  );
};


MovieDetailsPageHeader.propTypes = {
  movie: MoviePropType.isRequired,
  onMovieClick: PropTypes.func,
};
