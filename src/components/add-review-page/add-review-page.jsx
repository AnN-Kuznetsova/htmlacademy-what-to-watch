import PropTypes from "prop-types";
import React, {createRef} from "react";

import {MIN_REVIEW_TEXT_LENGTH, MAX_REVIEW_TEXT_LENGTH, RATING_RANGE} from "../../const";
import {Error} from "../../api";
import {Header} from "../header/header";
import {MoviePropType} from "../../prop-types";
import {RatingItem} from "../../rating-item/rating-item";
import {withNewReview} from "../../hocs/with-new-review/with-new-review";


const getErrorMessage = (dataError) => {
  switch (true) {
    case dataError === null:
      return null;

    case dataError.response && dataError.response.status === Error.UNAUTHORIZED:
      return (`Only authorized users can leave a review. Please register.`);

    case dataError.response === Error.VALIDATION:
      const errorTexts = [`Please enter correct data:`];
      if (dataError.data.ratingValueError) {
        errorTexts.push(`The rating of the film must be at least 1 star.`);
      }
      if (dataError.data.reviewTextValueError) {
        errorTexts.push(`Review text must be at least 50 and no more than 400 characters.`);
      }
      return errorTexts.join(`\n`);

    case dataError.response && dataError.response.status === Error.BAD_REQUEST:
    default:
      return (`Sorry, your review could not be submitted. Please try again.`);
  }
};

const getReviewRatingValidation = (ratingContainer) => {
  const ratingElement = Array.from(ratingContainer.querySelectorAll(`input`))
    .filter((ratingItem) => ratingItem.checked)[0];

  const rating = ratingElement ? +(ratingElement.value) : null;

  return rating ? rating : false;
};

const getReviewTextValidation = (reviewTextValue) => {
  return reviewTextValue.length >= MIN_REVIEW_TEXT_LENGTH && reviewTextValue.length <= MAX_REVIEW_TEXT_LENGTH ? reviewTextValue : false;
};


const AddReviewPage = (props) => {
  const {
    movie,
    dataError,
    sendReview,
    setDataError,
    reviewRating,
    reviewText,
    onChange,
  } = props;

  const ratingRef = createRef();
  const reviewTextRef = createRef();
  const addReviewButtonRef = createRef();
  const addReviewFormRef = createRef();

  const errorMessage = dataError ? getErrorMessage(dataError) : null;

  const handleDataReviewChange = () => {
    const ratingValue = getReviewRatingValidation(ratingRef.current) || null;
    const reviewTextValue = getReviewTextValidation(reviewTextRef.current.value) || null;

    onChange(ratingValue, reviewTextValue);

    if (ratingValue && reviewTextValue) {
      addReviewButtonRef.current.disabled = false;
      addReviewButtonRef.current.style.opacity = 1;
      setDataError(null);
    } else {
      addReviewButtonRef.current.disabled = true;
      addReviewButtonRef.current.style.opacity = 0.5;
      setDataError({
        response: Error.VALIDATION,
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
      rating: reviewRating,
      comment: reviewText,
      addReviewFormElements: addReviewFormRef.current.elements,
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
          ref={addReviewFormRef}
        >
          <div className="rating">
            <div
              ref={ratingRef}
              className="rating__stars"
              style={dataError && dataError.response === Error.VALIDATION && dataError.data.ratingValueError ? {borderRadius: `8px`, boxShadow: `0 0 0 1px #A8421E`} : {}}>
              {new Array(RATING_RANGE).fill(``).map((ratingItem, index) => (
                <RatingItem
                  key={ratingItem + index}
                  id={index + 1}
                  onClick={handleDataReviewChange}
                />
              ))}
            </div>
          </div>

          <div className="add-review__text" style={{backgroundColor: `rgba(255, 255, 255, 0.3)`}}>
            <textarea
              ref={reviewTextRef}
              className="add-review__textarea"
              name="review-text" id="review-text"
              placeholder="Review text"
              onChange={handleDataReviewChange}
              style={dataError && dataError.response === Error.VALIDATION && dataError.data.reviewTextValueError ? {borderRadius: `8px`, boxShadow: `0 0 0 1px #A8421E`} : {}}>
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


AddReviewPage.propTypes = {
  movie: MoviePropType.isRequired,
  dataError: PropTypes.object,
  sendReview: PropTypes.func.isRequired,
  setDataError: PropTypes.func.isRequired,
  reviewRating: PropTypes.number,
  reviewText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};


const AddReviewPageWithNewReview = withNewReview(AddReviewPage);


export {
  AddReviewPage,
  AddReviewPageWithNewReview,
};
