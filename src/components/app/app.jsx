import PropTypes from "prop-types";
import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducers/reducer";
import {MainPage} from "../main-page/main-page";
import {MovieDetailsPage} from "../movie-details-page/movie-details-page";
import {MoviePropType} from "../../prop-types";
import {PageType, NUMBER_OF_SIMILAR_FILMS} from "../../const";
import {VideoPlayerMode} from "../../hocs/with-video/with-video";
import {VideoPlayerPage} from "../player-page/player-page";


const AppComponent = (props) => {
  const {
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
          <VideoPlayerPage
            movie={activeMovie}
            playerMode={VideoPlayerMode.FULL_SCREEN}
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
          <VideoPlayerPage
            movie={activeMovie}
          />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
};


AppComponent.propTypes = {
  activePage: PropTypes.string.isRequired,
  activeMovie: MoviePropType.isRequired,
  onOpenMovieDetailsPage: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  activePage: state.activePage,
  activeMovie: state.activeMovie,
});

const mapDispatchToProps = (dispatch) => ({
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
