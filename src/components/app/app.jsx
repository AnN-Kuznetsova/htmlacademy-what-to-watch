import PropTypes from "prop-types";
import React from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {ActionCreator as DataActionCtrator, Operation} from "../../reducers/data/data";
import {AddReviewPageWithNewReview} from "../add-review-page/add-review-page";
import {ErrorPage} from "../error-page/error-page";
import {MainPage} from "../main-page/main-page";
import {MovieDetailsPage} from "../movie-details-page/movie-details-page";
import {MoviePropType} from "../../prop-types";
import {PageType, NUMBER_OF_SIMILAR_FILMS, AppRoute} from "../../const";
import {PlayerPage} from "../player-page/player-page";
import {PrivateRoute} from "../private-route/private-route";
import {RedirectToMainRoute} from "../redirect-to-main-route/redirect-to-main-route";
import {SignIn} from "../sign-in/sign-in";
import {getActivePage} from "../../reducers/application/selectors";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {getDataError, getMovies, getPromoMovie} from "../../reducers/data/selectors";
import {history} from "../../history";


const AppComponent = (props) => {
  const {
    dataError,
    activePage,
    promoMovie,
    movies,
    authorizationStatus,
    onOpenMovieDetailsPage,
    onAddReviewButtonClick,
    setDataError,
    sendReview,
    changeActivePage,
    changeActiveMovie,
  } = props;

  const renderPage = () => {
    window.scrollTo(0, 0);

    switch (activePage) {
      case PageType.MAIN:
        changeActiveMovie(promoMovie);
        return (
          <MainPage
            promoMovie={promoMovie}
            openMovieDetailsPage={onOpenMovieDetailsPage}
          />
        );

      case PageType.ERROR:
        return (
          <ErrorPage
            dataError={dataError}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          {renderPage()}
        </Route>

        <RedirectToMainRoute exact path={AppRoute.FILM}
          render={(routeProps) => {
            const newActiveMovie = movies.find((movie) => movie.id === +routeProps.match.params.id);
            if (!dataError) {
              onOpenMovieDetailsPage(newActiveMovie);
            }

            return (
              <MovieDetailsPage
                activeMovie={newActiveMovie}
                authorizationStatus={authorizationStatus}
                onSmallMovieCardClick={onOpenMovieDetailsPage}
                onAddReviewButtonClick={onAddReviewButtonClick}
              />
            );
          }}
        />

        <RedirectToMainRoute exact path={AppRoute.PLAYER}
          render={(routeProps) => {
            const newActiveMovie = movies.find((movie) => movie.id === +routeProps.match.params.id);
            changeActiveMovie(newActiveMovie);
            changeActivePage(PageType.PLAYER);

            return (
              <PlayerPage
                movie={newActiveMovie}
              />
            );
          }}
        />

        <RedirectToMainRoute exact path={AppRoute.SIGN_IN}
          render={() => {
            changeActivePage(PageType.SIGN_IN);
            return (<SignIn />);
          }}
        />

        <PrivateRoute exact path={AppRoute.ADD_REVIEW}
          render={(routeProps) => {
            const newActiveMovie = movies.find((movie) => movie.id === +routeProps.match.params.id);
            changeActiveMovie(newActiveMovie);
            changeActivePage(PageType.ADD_REVIEW);

            return (
              <AddReviewPageWithNewReview
                movie={newActiveMovie}
                dataError={dataError}
                setDataError={setDataError}
                sendReview={sendReview}
              />
            );
          }}
        />

        <Route
          render={() => {
            setDataError({status: 404});
            changeActivePage(PageType.ERROR);
            return (<Redirect to={AppRoute.MAIN} />);
          }}
        />
      </Switch>
    </Router>
  );
};


AppComponent.propTypes = {
  dataError: PropTypes.object,
  activePage: PropTypes.string.isRequired,
  promoMovie: MoviePropType,
  movies: PropTypes.arrayOf(MoviePropType),
  authorizationStatus: PropTypes.string.isRequired,
  onOpenMovieDetailsPage: PropTypes.func.isRequired,
  onAddReviewButtonClick: PropTypes.func.isRequired,
  setDataError: PropTypes.func.isRequired,
  sendReview: PropTypes.func.isRequired,
  changeActivePage: PropTypes.func.isRequired,
  changeActiveMovie: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  dataError: getDataError(state),
  activePage: getActivePage(state),
  authorizationStatus: getAuthorizationStatus(state),
  movies: getMovies(state),
  promoMovie: getPromoMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOpenMovieDetailsPage(movie) {
    dispatch(DataActionCtrator.setMaxMoviesCount(NUMBER_OF_SIMILAR_FILMS));
    dispatch(ApplicationActionCreator.resetVisibleMoviesCount());
    dispatch(ApplicationActionCreator.changeActiveMovie(movie));
    dispatch(Operation.loadActiveMovieReviews(movie.id));
    dispatch(ApplicationActionCreator.changeGenre(movie.genres[0]));
    dispatch(ApplicationActionCreator.changeActivePage(PageType.MOVIE_DETAILS));
  },
  onAddReviewButtonClick() {
    dispatch(ApplicationActionCreator.changeActivePage(PageType.ADD_REVIEW));
    dispatch(DataActionCtrator.setDataError(null));
  },
  setDataError(error) {
    dispatch(DataActionCtrator.setDataError(error));
  },
  sendReview(reviewData) {
    dispatch(Operation.sendReview(reviewData));
  },
  changeActivePage(page) {
    dispatch(ApplicationActionCreator.changeActivePage(page));
  },
  changeActiveMovie(movie) {
    dispatch(ApplicationActionCreator.changeActiveMovie(movie));
  },
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);


export {
  AppComponent,
  App,
};
