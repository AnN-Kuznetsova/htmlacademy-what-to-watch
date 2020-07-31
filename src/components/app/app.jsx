import PropTypes from "prop-types";
import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {ActionCreator as DataActionCtrator, Operation} from "../../reducers/data/data";
import {AddReviewPage} from "../add-review-page/add-review-page";
import {ErrorPage} from "../error-page/error-page";
import {MainPage} from "../main-page/main-page";
import {MovieDetailsPage} from "../movie-details-page/movie-details-page";
import {MoviePropType} from "../../prop-types";
import {PageType, NUMBER_OF_SIMILAR_FILMS} from "../../const";
import {PlayerPage} from "../player-page/player-page";
import {SignIn} from "../sign-in/sign-in";
import {getActivePage, getActiveMovie} from "../../reducers/application/selectors";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {getError} from "../../reducers/data/selectors";


const AppComponent = (props) => {
  const {
    dataError,
    activePage,
    activeMovie,
    authorizationStatus,
    onOpenMovieDetailsPage,
    onAddReviewButtonClick,
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
        return (
          <MovieDetailsPage
            activeMovie={activeMovie}
            authorizationStatus={authorizationStatus}
            onSmallMovieCardClick={onOpenMovieDetailsPage}
            onAddReviewButtonClick={onAddReviewButtonClick}
          />
        );
      case PageType.PLAYER:
        return (
          <PlayerPage
            movie={activeMovie}
          />
        );
      case PageType.SIGN_IN:
        return (
          <SignIn />
        );
      case PageType.ADD_REVIEW:
        return (
          <AddReviewPage
            //movie={activeMovie}
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
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {renderPage()}
        </Route>
        {/* <Route exact path="/movie-details">
          <MovieDetailsPage
            activeMovie={activeMovie}
            onSmallMovieCardClick={this.openMovieDetailsPage.bind(this)}
          />
        </Route>
        <Route exact path="/sign-in">
          <SignIn onSubmit={() => {}} />
        </Route>
        <Route exact path="/dev-review">
          <AddReviewPage />
        </Route>*/}
      </Switch>
    </BrowserRouter>
  );
};


AppComponent.propTypes = {
  dataError: PropTypes.object,
  activePage: PropTypes.string.isRequired,
  activeMovie: MoviePropType,
  authorizationStatus: PropTypes.string.isRequired,
  onOpenMovieDetailsPage: PropTypes.func.isRequired,
  onAddReviewButtonClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  dataError: getError(state),
  activePage: getActivePage(state),
  activeMovie: getActiveMovie(state),
  authorizationStatus: getAuthorizationStatus(state),
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
  }
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);


export {
  AppComponent,
  App,
};
