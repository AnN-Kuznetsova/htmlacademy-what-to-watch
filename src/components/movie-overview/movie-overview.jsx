import React from "react";

import {MoviePropType} from "../../prop-types";
import {
  getParticipantsLine,
  getFormattedScore,
  getRatingDescription,
} from "../../utils/utils";


export const MovieOverview = (props) => {
  const {movie} = props;

  const scoreValue = getFormattedScore(movie.rating.score);
  const ratingDescription = getRatingDescription(movie.rating.score);

  const descriptionMarkup = movie.description.map((descriptionItem, index) =>
    <p key={descriptionItem + index}>{descriptionItem}</p>);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};


MovieOverview.propTypes = {
  movie: MoviePropType.isRequired,
};
