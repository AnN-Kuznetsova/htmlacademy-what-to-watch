import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducers/reducer";
import {MainPage} from "../main-page/main-page";
import {MovieDetailsPage} from "../movie-details-page/movie-details-page";
import {MoviePropType} from "../../prop-types";
import {PageType, NUMBER_OF_SIMILAR_FILMS} from "../../const";


class AppComponent extends PureComponent {
  openMovieDetailsPage(movie) {
    this.props.onOpenMovieDetails(movie);
  }

  renderPage() {
    const {activePage, activeMovie} = this.props;

    window.scrollTo(0, 0);

    switch (activePage) {
      case PageType.MAIN:
        return (
          <MainPage
            promoMovie={activeMovie}
            openMovieDetailsPage={this.openMovieDetailsPage.bind(this)}
          />
        );
      case PageType.MOVIE_DETAILS:
        return (
          <MovieDetailsPage
            activeMovie={activeMovie}
            onSmallMovieCardClick={this.openMovieDetailsPage.bind(this)}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderPage()}
          </Route>
          {/* <Route exact path="/movie-details">
            <MovieDetailsPage
              activeMovie={activeMovie}
              onSmallMovieCardClick={this.openMovieDetailsPage.bind(this)}
            />
          </Route>*/}
        </Switch>
      </BrowserRouter>
    );
  }
}


AppComponent.propTypes = {
  activePage: PropTypes.string.isRequired,
  activeMovie: MoviePropType.isRequired,
  onOpenMovieDetails: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  activePage: state.activePage,
  activeMovie: state.activeMovie,
});

const mapDispatchToProps = (dispatch) => ({
  onOpenMovieDetails(movie) {
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
