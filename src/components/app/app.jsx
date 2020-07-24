import PropTypes from "prop-types";
import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducers/application/application";
// import {AuthorizationStatus} from "../../reducers/user/user";
import {MainPage} from "../main-page/main-page";
import {MovieDetailsPage} from "../movie-details-page/movie-details-page";
import {MoviePropType} from "../../prop-types";
import {Operation as UserOperation} from "../../reducers/user/user";
import {PageType, NUMBER_OF_SIMILAR_FILMS} from "../../const";
import {PlayerPage} from "../player-page/player-page";
import {getActivePage, getActiveMovie} from "../../reducers/application/selectors";
import {getAuthorizationStatus} from "../../reducers/user/selectors";


const AppComponent = (props) => {
  const {
    /* authorizationStatus,
    login, */
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
            openMovieDetailsPage={onOpenMovieDetailsPage}
          />
        );
      case PageType.MOVIE_DETAILS:
        return (
          <MovieDetailsPage
            activeMovie={activeMovie}
            onSmallMovieCardClick={onOpenMovieDetailsPage}
          />
        );
      case PageType.PLAYER:
        return (
          <PlayerPage
            movie={activeMovie}
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
        </Route>*/}
        {/* <Route exact path="/player">
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
  activePage: PropTypes.string.isRequired,
  activeMovie: MoviePropType.isRequired,
  onOpenMovieDetailsPage: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  activePage: getActivePage(state),
  activeMovie: getActiveMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onOpenMovieDetailsPage(movie) {
    dispatch(ActionCreator.changeActiveMovie(movie));
    dispatch(ActionCreator.changeGenre(movie.genres[0]));
    dispatch(ActionCreator.getMovies(NUMBER_OF_SIMILAR_FILMS));
    dispatch(ActionCreator.changeActivePage(PageType.MOVIE_DETAILS));
  }
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);


export {
  AppComponent,
  App,
};
