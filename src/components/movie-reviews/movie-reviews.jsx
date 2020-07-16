import React from "react";

import {MoviePropType} from "../../prop-types";
import {
  getFormatedScore,
  getFormatedDate,
} from "../../utils/utils";


const COLUMNS_COUNT = 2;


export const MovieReviews = (props) => {
  const {movie} = props;
  const {reviews} = movie;

  const columns = [];

  for (let columnIndex = 1; columnIndex <= COLUMNS_COUNT; columnIndex++) {
    const rows = [];
    for (let rowIndex = columnIndex - 1; rowIndex < reviews.length; rowIndex += COLUMNS_COUNT) {
      const review = reviews[rowIndex];
      rows.push(
          <div key={review.author + rowIndex} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{review.text}</p>

              <footer className="review__details">
                <cite className="review__author">{review.author}</cite>
                <time className="review__date" dateTime={getFormatedDate(review.date, true)}>
                  {getFormatedDate(review.date)}
                </time>
              </footer>
            </blockquote>

            <div className="review__rating">{getFormatedScore(review.rating)}</div>
          </div>
      );
    }
    columns.push(<div key={columnIndex} className="movie-card__reviews-col">{rows}</div>);
  }

  return (
    <div className="movie-card__reviews movie-card__row">
      {columns}
    </div>
  );
};


MovieReviews.propTypes = {
  movie: MoviePropType.isRequired,
};
