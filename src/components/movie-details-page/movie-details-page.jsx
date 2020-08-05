import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {ActionCreator as DataActionCtrator, Operation} from "../../reducers/data/data";
import {Catalog} from "../catalog/catalog";
import {Footer} from "../footer/footer";
import {MovieCardFullWithPlayer} from "../movie-card-full/movie-card-full";
import {MoviePropType} from "../../prop-types";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {getMovieById} from "../../reducers/data/selectors";
import {PageType, NUMBER_OF_SIMILAR_FILMS} from "../../const";


class MovieDetailsPageComponent extends PureComponent {
  componentDidMount() {
    this.props.onOpenMovieDetailsPage(this.props.movie);
  }

  componentDidUpdate() {
    this.props.onOpenMovieDetailsPage(this.props.movie);
  }

  render() {
    const {
      movie,
      authorizationStatus,
      onAddReviewButtonClick,
    } = this.props;

    return (
      <React.Fragment>
        <MovieCardFullWithPlayer
          movie={movie}
          authorizationStatus={authorizationStatus}
          onAddReviewButtonClick={onAddReviewButtonClick}
        />

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">
              More like this
            </h2>

            <Catalog />
          </section>

          <Footer />
        </div>
      </React.Fragment>
    );
  }
}


MovieDetailsPageComponent.propTypes = {
  routeProps: PropTypes.object.isRequired,
  movie: MoviePropType.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onAddReviewButtonClick: PropTypes.func.isRequired,
  onOpenMovieDetailsPage: PropTypes.func.isRequired,
};


const mapStateToProps = (state, props) => {
  const {routeProps} = props;
  const movieId = +routeProps.match.params.id;

  return {
    movie: getMovieById(state, movieId),
    authorizationStatus: getAuthorizationStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onAddReviewButtonClick() {
    dispatch(ApplicationActionCreator.changeActivePage(PageType.ADD_REVIEW));
    dispatch(DataActionCtrator.setDataError(null));
  },
  onOpenMovieDetailsPage(movie) {
    dispatch(DataActionCtrator.setMaxMoviesCount(NUMBER_OF_SIMILAR_FILMS));
    dispatch(ApplicationActionCreator.resetVisibleMoviesCount());
    dispatch(ApplicationActionCreator.changeActiveMovie(movie));
    dispatch(Operation.loadActiveMovieReviews(movie.id));
    dispatch(ApplicationActionCreator.changeGenre(movie.genres[0]));
    dispatch(ApplicationActionCreator.changeActivePage(PageType.MOVIE_DETAILS));
  },
});

const MovieDetailsPage = connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPageComponent);


export {
  MovieDetailsPageComponent,
  MovieDetailsPage,
};
