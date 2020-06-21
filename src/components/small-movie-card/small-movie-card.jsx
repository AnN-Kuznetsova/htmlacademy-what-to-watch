import PropTypes from "prop-types";
import React from "react";


export const SmallMovieCard = (props) => {
  const {movieTitle, onClick} = props;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div
        className="small-movie-card__image"
        onClick={onClick}
      >
        <img
          src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg"
          alt={movieTitle}
          width="280"
          height="175"
        />
      </div>
      <h3 className="small-movie-card__title">
        <a
          className="small-movie-card__link"
          href="movie-page.html"
          onClick={onClick}
        >{movieTitle}</a>
      </h3>
    </article>
  );
};


SmallMovieCard.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
