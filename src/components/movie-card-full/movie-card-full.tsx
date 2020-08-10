import PropTypes from "prop-types";
import * as React from "react";
import {Link} from "react-router-dom";

import {AppRoute} from "../../const";
import {Header} from "../header/header";
import {ListButton} from "../list-button/list-button";
import {MovieCardInfoWithTabs} from "../movie-card-info/movie-card-info";
import {MoviePropType} from "../../prop-types";


export const MovieCardFull = (props) => {
  const {
    movie,
    onAddReviewButtonClick,
  } = props;

  return (
    <section
      className="movie-card movie-card--full"
      style={{backgroundColor: movie.backgroundColor}}
    >
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={movie.backgroundUrl} alt={movie.title} />
        </div>

        <Header />

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{movie.title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{movie.genres[0]}</span>
              <span className="movie-card__year">{movie.releaseDate.getFullYear()}</span>
            </p>

            <div className="movie-card__buttons">
              <Link
                className="btn btn--play movie-card__button"
                to={AppRoute.PLAYER.replace(`:id`, movie.id)}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s" />
                </svg>
                <span>Play</span>
              </Link>

              <ListButton />

              <Link
                className="btn movie-card__button"
                onClick={onAddReviewButtonClick}
                to={AppRoute.ADD_REVIEW.replace(`:id`, movie.id)}
              >Add review
              </Link>
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
  onAddReviewButtonClick: PropTypes.func.isRequired,
};
