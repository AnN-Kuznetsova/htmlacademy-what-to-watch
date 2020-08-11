import * as React from "react";

import {MovieType} from "../../types";
import {
  getParticipantsLine,
  getFormatedScore,
  getRatingDescription,
} from "../../utils/utils";


interface Props {
  movie: MovieType;
}


const MovieOverview: React.FunctionComponent<Props> = (props: Props) => {
  const {movie} = props;

  const scoreValue = getFormatedScore(movie.rating.score);
  const ratingDescription = getRatingDescription(movie.rating.score);

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
        {movie.description.map((descriptionItem, index) =>
          <p key={descriptionItem + index}>{descriptionItem}</p>)}

        <p className="movie-card__director"><strong>Director: {getParticipantsLine(movie.directors)}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {getParticipantsLine(movie.starring)}</strong></p>
      </div>
    </React.Fragment>
  );
};


export {
  MovieOverview,
};
