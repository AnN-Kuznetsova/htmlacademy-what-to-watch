import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {MainPage} from "../main-page/main-page.jsx";
import {MoviePropType} from "../../prop-types.js";
import {PageType} from "../../const.js";


export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.hoverMovie = null;

    this.state = {
      activePage: PageType.MAIN_INDEX,
      activeMovie: this.props.promoMovie,
    };

    this.handleSmallMovieCardHover = this.handleSmallMovieCardHover.bind(this);
    this.handleSmallMovieCardClick = this.handleSmallMovieCardClick.bind(this);
    this.handlePromoMovieClick = this.handlePromoMovieClick.bind(this);
  }

  handleSmallMovieCardHover(newHoverMovie) {
    this.hoverMovie = newHoverMovie;
  }

  handleSmallMovieCardClick() {
    this.setState({
      activePage: PageType.MAIN_MOVIE_DETAILS,
      activeMovie: this.hoverMovie,
    });
  }

  handlePromoMovieClick() {
    if (this.state.activePage === PageType.MAIN_INDEX) {
      this.setState({
        activePage: PageType.MAIN_MOVIE_DETAILS,
      });
    }
  }

  renderPage() {
    const {films} = this.props;
    const {activePage, activeMovie} = this.state;

    switch (activePage) {
      case PageType.MAIN_INDEX:
      case PageType.MAIN_MOVIE_DETAILS:
        return (
          <MainPage
            currentMovie={activeMovie}
            films={films}
            activePage={activePage}
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
          <Route exact path="/movie-details">
            <MainPage
              currentMovie={this.state.activeMovie}
              films={films}
              activePage={PageType.MAIN_MOVIE_DETAILS}
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
