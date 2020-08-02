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
import {SignIn} from "../sign-in/sign-in";
import {getActivePage, getActiveMovie} from "../../reducers/application/selectors";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {getDataError, getMovies} from "../../reducers/data/selectors";
import {history} from "../../history";


const AppComponent = (props) => {
  const {
    dataError,
    activePage,
    activeMovie,
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
        return (
          <MainPage
            promoMovie={activeMovie}
            openMovieDetailsPage={onOpenMovieDetailsPage}
          />
        );

      case PageType.MOVIE_DETAILS:
        return (<Redirect to={AppRoute.FILM.replace(`:id`, activeMovie.id)} />);

      case PageType.PLAYER:
        return (<Redirect to={AppRoute.PLAYER} />);

      case PageType.SIGN_IN:
        return (<Redirect to={AppRoute.SIGN_IN} />);

      case PageType.ADD_REVIEW:
        return (<Redirect to={AppRoute.ADD_REVIEW} />);

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

        <Route path={AppRoute.FILM}
          render={(routeProps) => {
            const newActiveMovie = movies.find((movie) => movie.id === +routeProps.match.params.id);
            onOpenMovieDetailsPage(newActiveMovie);

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

        {/* <Route exact path={AppRoute.PLAYER}>
          <PlayerPage
            movie={activeMovie}
          />
        </Route> */}

        {/* <Route exact path={AppRoute.SIGN_IN}
          render={() => {
            changeActivePage(PageType.SIGN_IN);
            return (<SignIn />);
          }}
        /> */}

        {/* <PrivateRoute
          exact
          path={AppRoute.ADD_REVIEW}
          render={() => {
            return (
              <AddReviewPageWithNewReview
                movie={activeMovie}
                dataError={dataError}
                setDataError={setDataError}
                sendReview={sendReview}
              />
            );
          }}
        /> */}
      </Switch>
    </Router>
  );
};


AppComponent.propTypes = {
  dataError: PropTypes.object,
  activePage: PropTypes.string.isRequired,
  activeMovie: MoviePropType,
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
  activeMovie: getActiveMovie(state),
  authorizationStatus: getAuthorizationStatus(state),
  movies: getMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOpenMovieDetailsPage(movie) {
    dispatch(DataActionCtrator.setMaxMoviesCount(NUMBER_OF_SIMILAR_FILMS));
    dispatch(ApplicationActionCreator.changeActiveMovie(movie));
    dispatch(Operation.loadActiveMovieReviews(movie.id));
    dispatch(ApplicationActionCreator.changeGenre(movie.genres[0]));
    dispatch(ApplicationActionCreator.changeActivePage(PageType.MOVIE_DETAILS));
  },
  onAddReviewButtonClick() {
    dispatch(ApplicationActionCreator.changeActivePage(PageType.ADD_REVIEW));
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
