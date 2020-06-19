import PropTypes from "prop-types";
import React from "react";


export const SmallMovieCard = (props) => {
  const {movie, onClick} = props;
  const {title, smallPictureUrl} = movie;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div
        className="small-movie-card__image"
        onClick={onClick}
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
          onClick={onClick}
        >{title}</a>
      </h3>
    </article>
  );
};


SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    smallPictureUrl: PropTypes.string.isRequired,
    backgroundUrl: PropTypes.string.isRequired,
    posterUrl: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.instanceOf(Date).isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    runTime: PropTypes.string.isRequired,
    reviews: PropTypes.array.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
