import React from "react";
import {MoviePropType} from "../../prop-types.js";
import {
  getRatingDescription,
  getFormattedScore
} from "../../utils/utils.js";
import {MovieDetailsPageHeader} from "../movie-details-page-header/movie-details-page-header.jsx";
 // ToDo: настроить Eslint или/и WebPack чтобы импортировал без расширений в т.ч.


const VISIBLE_PARTICIPANTS_COUNT = 4;

function getDirectorsLine(directors) {
  if (directors.length > 0) {
    return `Director: ` + directors.slice(0, VISIBLE_PARTICIPANTS_COUNT).join(`, `) + ` and other`;
  }
  return `Unknown`;
}


export const MovieCard = (props) => {
  const {movie} = props;
  const {
    title,
    posterUrl,
    description,
    directors,
    starring,
    rating,
  } = movie;
  const {score, totalVotes} = rating;

  // ToDo: вынести в функцию как getDirectorsLine
  const starringValue = `Starring: ` + starring.slice(0, VISIBLE_PARTICIPANTS_COUNT).join(`, `) + ` and other`;

  const scoreValue = getFormattedScore(score);
  const ratingDescription = getRatingDescription(score);

  const descriptionMarkup = description.map((descriptionItem, index) =>
    <p key={descriptionItem + index}>{descriptionItem}</p>);

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
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

              <p className="movie-card__director"><strong>{getDirectorsLine(directors)}</strong></p>

              <p className="movie-card__starring"><strong>{starringValue}</strong></p>
            </div>
          </div>
        </div>
    </div>
  );
};


MovieCard.propTypes = {
  movie: MoviePropType.isRequired,
};
