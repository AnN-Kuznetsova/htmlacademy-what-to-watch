import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {MainPage} from "../main-page/main-page.jsx";
import {MoviePage} from "../movie-page/movie-page.jsx";
import {MoviePropType} from "../../prop-types.js";
import {PageType} from "../../const.js";


export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.activeMovie = null;

    this.state = {
      activePage: PageType.MAIN,
      currentActiveMovie: null,
    };

    this.handleSmallMovieCardHover = this.handleSmallMovieCardHover.bind(this);
    this.handleSmallMovieCardClick = this.handleSmallMovieCardClick.bind(this);
    this.handlePromoMovieClick = this.handlePromoMovieClick.bind(this);
  }

  handleSmallMovieCardHover(newActiveMovie) {
    this.activeMovie = newActiveMovie;
  }

  handleSmallMovieCardClick() {
    this.setState({
      activePage: PageType.MOVIE,
      currentActiveMovie: this.activeMovie,
    });
  }

  handlePromoMovieClick() {
    this.setState({
      currentActiveMovie: this.props.promoMovie,
      activePage: PageType.MOVIE,
    });
  }

  renderPage() {
    const {promoMovie, films} = this.props;
    const {activePage} = this.state;

    switch (activePage) {
      case PageType.MAIN:
        return (
          <MainPage
            promoMovie={promoMovie}
            films={films}
            onSmallMovieCardHover={this.handleSmallMovieCardHover}
            onSmallMovieCardClick={this.handleSmallMovieCardClick}
            onPromoMovieClick={this.handlePromoMovieClick}
          />
        );
      case PageType.MOVIE:
        return (
          <MoviePage
            currentMovie={this.state.currentActiveMovie}
            films={films}
            onSmallMovieCardHover={this.handleSmallMovieCardHover}
            onSmallMovieCardClick={this.handleSmallMovieCardClick}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const {promoMovie, films} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderPage()}
          </Route>
          <Route exact path="/movie-page">
            <MoviePage
              currentMovie={promoMovie}
              films={films}
              onSmallMovieCardHover={this.handleSmallMovieCardHover}
              onSmallMovieCardClick={this.handleSmallMovieCardClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}


App.propTypes = {
  promoMovie: MoviePropType.isRequired,
  films: PropTypes.arrayOf(MoviePropType).isRequired,
};
