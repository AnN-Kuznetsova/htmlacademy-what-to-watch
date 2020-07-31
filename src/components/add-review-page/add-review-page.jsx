import PropTypes from "prop-types";
import React, {createRef} from "react";
import {connect} from "react-redux";

import {MIN_REVIEW_TEXT_LEMGTH, MAX_REVIEW_TEXT_LEMGTH} from "../../const";
import {Header} from "../header/header";
import {MoviePropType} from "../../prop-types";
import {Operation, ActionCreator} from "../../reducers/data/data";
import {getActiveMovie} from "../../reducers/application/selectors";
import {getError} from "../../reducers/data/selectors";


export const AddReviewError = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  REVIEW_VALIDATION: `REVIEW_VALIDATION`,
};

const getErrorMessage = (dataError) => {
  switch (true) {
    case dataError === null:
      return null;

    case dataError.response && dataError.response.status === AddReviewError.UNAUTHORIZED:
      return (`Only authorized users can leave a review. Please register.`);

    case dataError.response === AddReviewError.REVIEW_VALIDATION:
      return (`Please enter correct data:
${dataError.data.reviewTextValueError ? `Review text must be at least 50 and no more than 400 characters.` : ``}
${dataError.data.ratingValueError ? `The rating of the film must be at least 1 star.` : ``}`);

    case dataError.response && dataError.response.status === AddReviewError.BAD_REQUEST:
    default:
      return (`Sorry, your review could not be submitted. Please try again.`);
  }
};

const getReviewRatingValidation = (ratingContainer) => {
  /* const rating = ratingContainer.querySelector(`.rating__input[checked]`);
  console.log(rating);

  return ratingContainer.querySelectorAll(`.rating__input`)[0]; */

  return 2;
};

const getReviewTextValidation = (reviewTextValue) => {
  return reviewTextValue.length >= MIN_REVIEW_TEXT_LEMGTH && reviewTextValue.length <= MAX_REVIEW_TEXT_LEMGTH ? reviewTextValue : false;
};


const AddReviewPageComponent = (props) => {
  const {
    movie,
    dataError,
    sendReview,
    setDataError,
  } = props;

  const ratingRef = createRef();
  const reviewTextRef = createRef();
  const addReviewButtonRef = createRef();

  let errorMessage = dataError ? getErrorMessage(dataError) : null;

  let ratingValue = null;
  let reviewTextValue = null;

  const handleDataReviewChange = () => {
    ratingValue = getReviewRatingValidation(ratingRef.current);
    reviewTextValue = getReviewTextValidation(reviewTextRef.current.value);

    if (ratingValue && reviewTextValue) {
      addReviewButtonRef.current.disabled = false;
      addReviewButtonRef.current.style.opacity = 1;
      setDataError(null);
    } else {
      addReviewButtonRef.current.disabled = true;
      addReviewButtonRef.current.style.opacity = 0.5;
      setDataError({
        response: AddReviewError.REVIEW_VALIDATION,
        data: {
          reviewTextValueError: reviewTextValue ? null : true,
          ratingValueError: ratingValue ? null : true,
        }
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    sendReview({
      movieId: movie.id,
      rating: ratingValue,
      comment: reviewTextValue,
    });
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
            <div ref={ratingRef} className="rating__stars">
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
            <textarea
              ref={reviewTextRef}
              className="add-review__textarea"
              name="review-text" id="review-text"
              placeholder="Review text"
              onChange={handleDataReviewChange}
              style={errorMessage ? {borderRadius: `8px`, boxShadow: `0 0 0 1px #A8421E`} : {}}>
            </textarea>
            <div className="add-review__submit">
              <button
                ref={addReviewButtonRef}
                className="add-review__btn"
                type="submit"
                disabled={true}
                style={{opacity: 0.5}}
              >Post</button>
            </div>
          </div>
        </form>

        {errorMessage && <p style={{whiteSpace: `pre-wrap`}}>{errorMessage}</p>}
      </div>

    </section>
  );
};


AddReviewPageComponent.propTypes = {
  movie: MoviePropType.isRequired,
  dataError: PropTypes.object,
  sendReview: PropTypes.func.isRequired,
  setDataError: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  movie: getActiveMovie(state),
  dataError: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  sendReview(reviewData) {
    dispatch(Operation.sendReview(reviewData));
  },
  setDataError(error) {
    dispatch(ActionCreator.setDataError(error));
  },
});

const AddReviewPage = connect(mapStateToProps, mapDispatchToProps)(AddReviewPageComponent);


export {
  AddReviewPageComponent,
  AddReviewPage,
};
