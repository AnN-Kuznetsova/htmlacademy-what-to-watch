import PropTypes from "prop-types";
import React from "react";
import {MoviePropType} from "../../prop-types";


export const SmallMovieCard = (props) => {
  const {movie, onClick, onHover} = props;
  const {title, smallPictureUrl} = movie;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div
        className="small-movie-card__image"
        onClick={(event) => {
          event.preventDefault();
          onClick(movie);
        }}
        onMouseEnter={(event) => {
          event.preventDefault();
          onHover(movie);
        }}
      >
        <img
          src={smallPictureUrl}
          alt={title}
          width="280"
          height="175"
        />
      </div>
      <h3 className="small-movie-card__title">
        <a
          className="small-movie-card__link"
          href="movie-page.html"
          onClick={(event) => {
            event.preventDefault();
            onClick(movie);
          }}
        >{title}</a>
      </h3>
    </article>
  );
};


SmallMovieCard.propTypes = {
  movie: MoviePropType.isRequired,
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
};
