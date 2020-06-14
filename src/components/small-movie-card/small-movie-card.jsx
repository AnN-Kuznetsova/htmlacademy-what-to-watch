import PropTypes from "prop-types";
import React from "react";


export const SmallMovieCard = (props) => {
  const {movieTitle, cardTitleClickHandler, cardImageClickHandler} = props;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img
          src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg"
          alt={movieTitle}
          width="280"
          height="175"
          onClick={cardImageClickHandler}
        />
      </div>
      <h3 className="small-movie-card__title">
        <a
          className="small-movie-card__link"
          href="movie-page.html"
          onClick={cardTitleClickHandler}
        >{movieTitle}</a>
      </h3>
    </article>
  );
};


SmallMovieCard.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  cardTitleClickHandler: PropTypes.func.isRequired,
  cardImageClickHandler: PropTypes.func.isRequired,
};
