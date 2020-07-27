import PropTypes from "prop-types";
import React from "react";

import {Header} from "../header/header";
import {MoviePropType} from "../../prop-types";


export const AddReviewPage = (props) => {
  const {movie} = props;

  const handleSubmit = (event) => {
    event.preventDefault();

    //onSubmit();
  };

  return (
    <section className="movie-card movie-card--full"
      style={{backgroundColor: movie.backgroundColor}}>
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={movie.backgroundUrl} alt={movie.title} />
        </div>

        <Header />

        <div className="movie-card__poster movie-card__poster--small">
          <img src={movie.posterUrl} alt={`${movie.title} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form
          action="#"
          className="add-review__form"
          onSubmit={handleSubmit}
        >
          <div className="rating">
            <div className="rating__stars">
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3" />
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text" style={{backgroundColor: `rgba(255, 255, 255, 0.3)`}}>
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
};


AddReviewPage.propTypes = {
  movie: MoviePropType.isRequired,
};
