import PropTypes from "prop-types";
import React from "react";


export const SmallMovieCard = (props) => {
  const {movie, onClick} = props;
  const {title, picture} = movie;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div
        className="small-movie-card__image"
        onClick={onClick}
      >
        <img
          src={picture}
          alt={title}
          width="280"
          height="175"
        />
      </div>
      <h3 className="small-movie-card__title">
        <a
          className="small-movie-card__link"
          href="movie-page.html"
          onClick={onClick}
        >{title}</a>
      </h3>
    </article>
  );
};


SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
