import PropTypes from "prop-types";
import React, {createRef, PureComponent} from "react";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {ActionCreator as DataActionCreator, Operation} from "../../reducers/data/data";
import {Error} from "../../api";
import {Header} from "../header/header";
import {MIN_REVIEW_TEXT_LENGTH, MAX_REVIEW_TEXT_LENGTH, RATING_RANGE, PageType, AppRoute, ERROR_COLOR} from "../../const";
import {MoviePropType} from "../../prop-types";
import {RatingItem} from "../rating-item/rating-item";
import {Redirect} from "react-router-dom";
import {getDataError, getMovieById} from "../../reducers/data/selectors";
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


class AddReviewPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this._ratingRef = createRef();
    this._reviewTextRef = createRef();
    this._addReviewButtonRef = createRef();
    this._addReviewFormRef = createRef();

    this._ratingValue = null;
    this._reviewTextValue = null;

    this.handleAddRreviewPageOpen = this.handleAddRreviewPageOpen.bind(this);
    this.handleDataReviewChange = this.handleDataReviewChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleAddRreviewPageOpen();
  }

  componentDidUpdate() {
    this.handleAddRreviewPageOpen();
  }

  handleAddRreviewPageOpen() {
    if (this.props.movie) {
      this.props.openAddReviewPage(this.props.movie);
    }
  }

  handleDataReviewChange() {
    this._ratingValue = getReviewRatingValidation(this._ratingRef.current) || null;
    this._reviewTextValue = getReviewTextValidation(this._reviewTextRef.current.value) || null;

    this.props.onChange(this._ratingValue, this._reviewTextValue);

    if (this._ratingValue && this._reviewTextValue) {
      this._addReviewButtonRef.current.disabled = false;
      this._addReviewButtonRef.current.style.opacity = 1;
      this.props.setDataError(null);
    } else {
      this._addReviewButtonRef.current.disabled = true;
      this._addReviewButtonRef.current.style.opacity = 0.5;
      this.props.setDataError({
        response: Error.VALIDATION,
        data: {
          reviewTextValueError: this._reviewTextValue ? null : true,
          ratingValueError: this._ratingValue ? null : true,
        }
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.sendReview({
      movieId: this.props.movie.id,
      rating: this.props.reviewRating,
      comment: this.props.reviewText,
      addReviewFormElements: this._addReviewFormRef.current.elements,
    });
  }

  render() {
    const {
      movie,
      dataError,
      onError,
    } = this.props;

    const errorMessage = dataError ? getErrorMessage(dataError) : null;

    if (!movie) {
      onError();
      return (<Redirect to={AppRoute.MAIN} />);
    }

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
            onSubmit={this.handleSubmit}
            ref={this._addReviewFormRef}
          >
            <div className="rating">
              <div
                ref={this._ratingRef}
                className="rating__stars"
                style={dataError && dataError.response === Error.VALIDATION && dataError.data.ratingValueError ? {borderRadius: `8px`, boxShadow: `0 0 0 1px ${ERROR_COLOR}`} : {}}>
                {new Array(RATING_RANGE).fill(``).map((ratingItem, index) => (
                  <RatingItem
                    key={ratingItem + index}
                    id={index + 1}
                    onClick={this.handleDataReviewChange}
                  />
                ))}
              </div>
            </div>

            <div className="add-review__text" style={{backgroundColor: `rgba(255, 255, 255, 0.3)`}}>
              <textarea
                ref={this._reviewTextRef}
                className="add-review__textarea"
                name="review-text" id="review-text"
                placeholder="Review text"
                onChange={this.handleDataReviewChange}
                style={dataError && dataError.response === Error.VALIDATION && dataError.data.reviewTextValueError ? {borderRadius: `8px`, boxShadow: `0 0 0 1px ${ERROR_COLOR}`} : {}}>
              </textarea>
              <div className="add-review__submit">
                <button
                  ref={this._addReviewButtonRef}
                  className="add-review__btn"
                  type="submit"
                  disabled={true}
                  style={{opacity: 0.5}}
                >Post</button>
              </div>
            </div>
          </form>

          {errorMessage && <p style={{whiteSpace: `pre-wrap`, color: ERROR_COLOR}}>{errorMessage}</p>}
        </div>

      </section>
    );
  }
}


AddReviewPageComponent.propTypes = {
  routeProps: PropTypes.object.isRequired,
  movie: MoviePropType,
  dataError: PropTypes.object,
  sendReview: PropTypes.func.isRequired,
  setDataError: PropTypes.func.isRequired,
  openAddReviewPage: PropTypes.func.isRequired,
  reviewRating: PropTypes.number,
  reviewText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};


const mapStateToProps = (state, props) => {
  const {routeProps} = props;
  const movieId = +routeProps.match.params.id;

  return {
    movie: getMovieById(state, movieId),
    dataError: getDataError(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  setDataError(error) {
    dispatch(DataActionCreator.setDataError(error));
  },
  sendReview(reviewData) {
    dispatch(Operation.sendReview(reviewData));
  },
  openAddReviewPage(movie) {
    dispatch(ApplicationActionCreator.changeActiveMovie(movie));
    dispatch(ApplicationActionCreator.changeActivePage(PageType.ADD_REVIEW));
  },
  onError() {
    dispatch(DataActionCreator.setDataError({status: 404}));
    dispatch(ApplicationActionCreator.changeActivePage(PageType.ERROR));
  },
});

const AddReviewPage = connect(mapStateToProps, mapDispatchToProps)(AddReviewPageComponent);
const AddReviewPageWithNewReview = withNewReview(AddReviewPage);


export {
  AddReviewPageComponent,
  AddReviewPage,
  AddReviewPageWithNewReview,
};
