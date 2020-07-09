import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {MainPage} from "../main-page/main-page.jsx";
import {MovieDetailsPage} from "../movie-details-page/movie-details-page.jsx";
import {MoviePropType} from "../../prop-types.js";
import {PageType} from "../../const.js";
import {Switch, Route, BrowserRouter} from "react-router-dom";


export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePage: PageType.MAIN,
      activeMovie: this.props.promoMovie,
    };

    this.handleSmallMovieCardClick = this.handleSmallMovieCardClick.bind(this);
    this.handlePromoMovieClick = this.handlePromoMovieClick.bind(this);
    this.getFilmsForCatalog = this.getFilmsForCatalog.bind(this);
  }

  handleSmallMovieCardClick(newActiveMovie) {
    this.setState({
      activeMovie: newActiveMovie,
      activePage: PageType.MOVIE_DETAILS,
    });
  }

  handlePromoMovieClick() {
    this.setState({
      activePage: PageType.MOVIE_DETAILS,
    });
    /* if (this.state.activePage === PageType.MAIN_INDEX) {
      this.setState({
        activePage: PageType.MAIN_MOVIE_DETAILS,
      });
    } */
  }

  getFilmsForCatalog(movies) {
    switch (this.state.activePage) {
      case PageType.MOVIE_DETAILS:
        return movies.filter((movie) => movie !== this.state.activeMovie);
      case PageType.MAIN:
      default:
        return movies;
    }
  }

  renderPage() {
    const {films} = this.props;
    const {activePage, activeMovie} = this.state;

    window.scrollTo(0, 0);

    switch (activePage) {
      case PageType.MAIN:
        return (
          <MainPage
            currentMovie={activeMovie}
            filmsForCatalog={this.getFilmsForCatalog(films)}
            activePage={activePage}
            onSmallMovieCardClick={this.handleSmallMovieCardClick}
            onCurrentMovieClick={this.handlePromoMovieClick}
          />
        );
      case PageType.MOVIE_DETAILS:
        return (
          <MovieDetailsPage
            currentMovie={activeMovie}
            filmsForCatalog={this.getFilmsForCatalog(films)}
            activePage={activePage}
            onSmallMovieCardClick={this.handleSmallMovieCardClick}
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
            {/* <MainPage
              currentMovie={this.state.activeMovie}
              films={films}
              activePage={PageType.MAIN_MOVIE_DETAILS}
              onSmallMovieCardClick={this.handleSmallMovieCardClick}
              onCurrentMovieClick={this.handlePromoMovieClick}
            /> */}
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
