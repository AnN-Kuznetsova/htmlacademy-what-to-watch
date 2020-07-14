import PropTypes from "prop-types";
import React from "react";

import {Header} from "../header/header";
import {MoviePropType} from "../../prop-types";


export const MovieCardPromo = (props) => {
  const {movie, onMovieClick} = props;

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={movie.backgroundUrl} alt={movie.title} />
      </div>

      <Header />

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster" onClick={onMovieClick}>
            <img src={movie.posterUrl} alt={movie.title} width="218" height="327" />
          </div>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


MovieCardPromo.propTypes = {
  movie: MoviePropType.isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
