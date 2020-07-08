import PropTypes from "prop-types";
import React from "react";
import {MoviePropType} from "../../prop-types";
import {NUMBER_OF_ELEMENTS_IN_LINE, PageType} from "../../const.js";
import {
  getRatingDescription,
  getStringFromLimitedNumbersOfArrayElements,
  getFormattedScore
} from "../../utils/utils.js";


export const MovieCard = (props) => {
  const {movie, activePage, onMovieClick} = props;
  const {title,
    backgroundUrl,
    posterUrl,
    genres,
    releaseDate,
    description,
    directors,
    starring,
    rating,
  } = movie;
  const {score, totalVotes} = rating;
  const isMainIndexPage = activePage === PageType.MAIN_INDEX;
  const isMainMovieDetailsPage = activePage === PageType.MAIN_MOVIE_DETAILS;

  const handlePosterClick = () => {
    if (isMainIndexPage) {
      onMovieClick();
    }
  };

  const handleTitleClick = () => {
    if (isMainIndexPage) {
      onMovieClick();
    }
  };

  const movieReleaseYear = releaseDate.getFullYear();
  const genre = genres[0];
  const directorValue = getStringFromLimitedNumbersOfArrayElements(directors, NUMBER_OF_ELEMENTS_IN_LINE, `Director: `, ` and other`);
  const starringValue = getStringFromLimitedNumbersOfArrayElements(starring, NUMBER_OF_ELEMENTS_IN_LINE, `Starring: `, ` and other`);
  const scoreValue = getFormattedScore(score);
  const ratingDescription = getRatingDescription(score);

  const descriptionMarkup = description.map((descriptionItem, index) =>
    <p key={descriptionItem + index}>{descriptionItem}</p>);

  const cardDeskMarkup = () => {
    return (
      <div className="movie-card__desc">
        <h2
          className="movie-card__title"
          onClick={handleTitleClick}
        >{title}</h2>
        <p className="movie-card__meta">
          <span className="movie-card__genre">{genre}</span>
          <span className="movie-card__year">{movieReleaseYear}</span>
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
          {isMainMovieDetailsPage && <a href="add-review.html" className="btn movie-card__button">Add review</a>}
        </div>
      </div>
    );
  };

  const cardHeaderMarkup = () => {
    const logoHrefValue = (isMainMovieDetailsPage) ? `main.html` : null;
    const logoHref = logoHrefValue ? {href: `main.html`} : null;

    return (
      <React.Fragment>
        <div className="movie-card__bg">
          <img src={backgroundUrl} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a {...logoHref} className="logo__link">
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
          {isMainMovieDetailsPage && cardDeskMarkup() ||
          <div className="movie-card__info">
            <div className="movie-card__poster"
              onClick={onMovieClick}
            >
              <img src={posterUrl} alt={title} width="218" height="327" />
            </div>

            {cardDeskMarkup()}
          </div>}
        </div>
      </React.Fragment>
    );
  };

  return (
    <section className={`movie-card ${isMainMovieDetailsPage ? `movie-card--full` : ``}`}>
      {
        isMainMovieDetailsPage && <div className="movie-card__hero">
          {cardHeaderMarkup()}
        </div> || cardHeaderMarkup()
      }

      {isMainMovieDetailsPage &&
        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div
              className="movie-card__poster movie-card__poster--big"
              onClick={handlePosterClick}
            >
              <img src={posterUrl} alt={`${title} poster`} width="218" height="327" />
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
                  <span className="movie-rating__count">{totalVotes} ratings</span>
                </p>
              </div>

              <div className="movie-card__text">
                {descriptionMarkup}

                <p className="movie-card__director"><strong>{directorValue}</strong></p>

                <p className="movie-card__starring"><strong>{starringValue}</strong></p>
              </div>
            </div>
          </div>
        </div>
      }
    </section>
  );
};


MovieCard.propTypes = {
  movie: MoviePropType.isRequired,
  activePage: PropTypes.string.isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
