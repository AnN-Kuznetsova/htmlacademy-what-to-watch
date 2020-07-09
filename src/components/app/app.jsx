import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {MainPage} from "../main-page/main-page.jsx";
import {MovieDetailsPage} from "../movie-details-page/movie-details-page.jsx";
import {MoviePropType} from "../../prop-types.js";
import {NUMBER_OF_SIMILAR_FILMS, PageType} from "../../const.js";
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
  }

  getFilmsForCatalog(movies) {
    switch (this.state.activePage) {
      case PageType.MOVIE_DETAILS:
        return movies.filter((movie) => movie !== this.state.activeMovie)
          .slice(0, NUMBER_OF_SIMILAR_FILMS);
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
    const {activeMovie} = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderPage()}
          </Route>
          <Route exact path="/movie-details">
            <MovieDetailsPage
              currentMovie={activeMovie}
              filmsForCatalog={this.getFilmsForCatalog(films)}
              activePage={PageType.MOVIE_DETAILS}
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
