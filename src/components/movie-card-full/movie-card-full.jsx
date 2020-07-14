import React from "react";

import {Header} from "../header/header";
import {MovieCardInfoWithTabs} from "../movie-card-info/movie-card-info";
import {MoviePropType} from "../../prop-types";


export const MovieCardFull = (props) => {
  const {movie} = props;

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

      <MovieCardInfoWithTabs movie={movie} />
    </section>
  );
};


MovieCardFull.propTypes = {
  movie: MoviePropType.isRequired,
};
