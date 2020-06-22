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

    this.state = {
      activePage: PageType.MAIN,
      activeMovie: null,
    };

    this.handleSmallMovieCardClick = this.handleSmallMovieCardClick.bind(this);
  }

  handleSmallMovieCardClick(newActiveMovie) {
    this.setState({
      activePage: PageType.MOVIE,
      activeMovie: newActiveMovie,
    });
  }

  renderPage() {
    const {promoMovie, films} = this.props;
    const {activePage, activeMovie} = this.state;

    switch (activePage) {
      case PageType.MAIN:
        return (
          <MainPage
            promoMovie={promoMovie}
            films={films}
            onSmallMovieCardClick={this.handleSmallMovieCardClick}
          />
        );
      case PageType.MOVIE:
        return (
          <MoviePage {...activeMovie} />
        );
      default:
        return null;
    }
  }

  render() {
    const {promoMovie} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderPage()}
          </Route>
          <Route exact path="/movie-page">
            <MoviePage {...promoMovie} />
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
