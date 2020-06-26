import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {MainPage} from "../main-page/main-page.jsx";
import {MoviePropType} from "../../prop-types.js";
import {PageType} from "../../const.js";


export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.activeMovie = null;

    this.state = {
      activePage: PageType.MAIN,
      currentActiveMovie: this.props.promoMovie,
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
    if (this.state.activePage === PageType.MAIN) {
      this.setState({
        activePage: PageType.MOVIE,
      });
    }
  }

  renderPage() {
    const {films} = this.props;
    const {activePage, currentActiveMovie} = this.state;

    switch (activePage) {
      case PageType.MAIN:
      case PageType.MOVIE:
        return (
          <MainPage
            currentMovie={currentActiveMovie}
            films={films}
            isMoviePage={activePage === PageType.MOVIE}
            onSmallMovieCardHover={this.handleSmallMovieCardHover}
            onSmallMovieCardClick={this.handleSmallMovieCardClick}
            onCurrentMovieClick={this.handlePromoMovieClick}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const {films} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderPage()}
          </Route>
          <Route exact path="/movie-page">
            <MainPage
              currentMovie={this.state.currentActiveMovie}
              films={films}
              isMoviePage={true}
              onSmallMovieCardHover={this.handleSmallMovieCardHover}
              onSmallMovieCardClick={this.handleSmallMovieCardClick}
              onCurrentMovieClick={this.handlePromoMovieClick}
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
