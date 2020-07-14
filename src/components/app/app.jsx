import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducers/reducer";
import {MainPage} from "../main-page/main-page";
import {MovieDetailsPage} from "../movie-details-page/movie-details-page";
import {MoviePropType} from "../../prop-types";
import {PageType} from "../../const";


class AppComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePage: PageType.MAIN,
    };

    this.openMovieDetailsPage = this.openMovieDetailsPage.bind(this);
  }

  openMovieDetailsPage(movie) {
    this.props.onActiveMovieChange(movie);

    this.setState({
      activePage: PageType.MOVIE_DETAILS,
    });
  }

  renderPage() {
    const {activePage} = this.state;
    const {activeMovie} = this.props;

    window.scrollTo(0, 0);

    switch (activePage) {
      case PageType.MAIN:
        return (
          <MainPage
            openMovieDetailsPage={this.openMovieDetailsPage}
          />
        );
      case PageType.MOVIE_DETAILS:
        return (
          <MovieDetailsPage
            activeMovie={activeMovie}
            onSmallMovieCardClick={this.openMovieDetailsPage}
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
              onSmallMovieCardClick={this.openMovieDetailsPage}
            />
          </Route>*/}
        </Switch>
      </BrowserRouter>
    );
  }
}


AppComponent.propTypes = {
  activeMovie: MoviePropType.isRequired,
  onActiveMovieChange: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  activeMovie: state.activeMovie,
});

const mapDispatchToProps = (dispatch) => ({
  onActiveMovieChange(movie) {
    dispatch(ActionCreator.changeActiveMovie(movie));
    dispatch(ActionCreator.changeGenre(movie.genres[0]));
    dispatch(ActionCreator.getMovies());
  }
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);


export {
  AppComponent,
  App,
};
