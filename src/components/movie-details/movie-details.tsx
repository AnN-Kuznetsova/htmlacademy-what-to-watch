import * as React from "react";

import {MovieType} from "../../types";
import {getFormatedRunTime} from "../../utils/utils";


interface Props {
  movie: MovieType;
}


const MovieDetails: React.FunctionComponent<Props> = (props: Props) => {
  const {movie} = props;

  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value" style={{whiteSpace: `pre-line`}}>
            {movie.directors.join(`, \r\n`)}
          </span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value" style={{whiteSpace: `pre-line`}}>
            {movie.starring.join(`, \r\n`)}
          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{getFormatedRunTime(movie.runTime)}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value" style={{whiteSpace: `pre-line`}}>
            {movie.genres.join(`, \r\n`)}
          </span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{movie.releaseDate.getFullYear()}</span>
        </p>
      </div>
    </div>
  );
};


export {
  MovieDetails,
};
