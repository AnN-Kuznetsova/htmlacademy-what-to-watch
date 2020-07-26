import PropTypes from "prop-types";
import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {ActionCreator as DataActionCtrator} from "../../reducers/data/data";
// import {AuthorizationStatus} from "../../reducers/user/user";
import {ErrorPage} from "../error-page/error-page";
import {MainPage} from "../main-page/main-page";
import {MovieDetailsPage} from "../movie-details-page/movie-details-page";
import {MoviePropType} from "../../prop-types";
import {Operation as UserOperation} from "../../reducers/user/user";
import {PageType, NUMBER_OF_SIMILAR_FILMS} from "../../const";
import {PlayerPage} from "../player-page/player-page";
import {getActivePage, getActiveMovie} from "../../reducers/application/selectors";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {getMovies, getError} from "../../reducers/data/selectors";


const AppComponent = (props) => {
  const {
    authorizationStatus,
    // login,
    isError,
    activePage,
    activeMovie,
    onOpenMovieDetailsPage,
  } = props;

  const renderPage = () => {
    window.scrollTo(0, 0);

    switch (activePage) {
      case PageType.MAIN:
        return (
          <MainPage
            promoMovie={activeMovie}
            authorizationStatus={authorizationStatus}
            openMovieDetailsPage={onOpenMovieDetailsPage}
          />
        );
      case PageType.MOVIE_DETAILS:
        return (
          <MovieDetailsPage
            activeMovie={activeMovie}
            authorizationStatus={authorizationStatus}
            onSmallMovieCardClick={onOpenMovieDetailsPage}
          />
        );
      case PageType.PLAYER:
        return (
          <PlayerPage
            movie={activeMovie}
          />
        );
      case PageType.ERROR:
        return (
          <ErrorPage
            isError={isError}
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
        <Route exact path="/player">
          <PlayerPage
            movie={activeMovie}
          />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
};


AppComponent.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  activePage: PropTypes.string.isRequired,
  activeMovie: MoviePropType,
  onOpenMovieDetailsPage: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  isError: getError(state),
  activePage: getActivePage(state),
  activeMovie: getActiveMovie(state),
  movies: getMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onOpenMovieDetailsPage(movie) {
    dispatch(DataActionCtrator.setMaxMoviesCount(NUMBER_OF_SIMILAR_FILMS));
    dispatch(ApplicationActionCreator.changeActiveMovie(movie));
    dispatch(ApplicationActionCreator.changeGenre(movie.genres[0]));
    dispatch(ApplicationActionCreator.changeActivePage(PageType.MOVIE_DETAILS));
  },
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);


export {
  AppComponent,
  App,
};
