import {array, arrayOf, string, instanceOf} from "prop-types";
import React from "react";


export const MovieCard = (props) => {
  const {title, genre, releaseDate, posterUrl, backgroundUrl} = props;
  const promoMovieReleaseYear = releaseDate.getFullYear();

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={backgroundUrl} alt={title} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a className="logo__link">
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
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={posterUrl} alt={title} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{promoMovieReleaseYear}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
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


MovieCard.propTypes = {
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
};
