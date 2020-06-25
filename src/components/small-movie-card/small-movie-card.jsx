import PropTypes from "prop-types";
import React from "react";
import {MoviePropType} from "../../prop-types";


export const SmallMovieCard = (props) => {
  const {movie, onClick, onHover} = props;
  const {title, smallPictureUrl} = movie;

  const handleCardImgClick = () => {
    onClick(movie);
  };

  const handleCardTitleClick = (event) => {
    event.preventDefault();
    onClick(movie);
  };

  const handleCardHover = () => {
    onHover(movie);
  };

  return (
    <article className="small-movie-card catalog__movies-card">
      <div
        className="small-movie-card__image"
        onClick={handleCardImgClick}
        onMouseEnter={handleCardHover}
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
          onClick={handleCardTitleClick}
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
