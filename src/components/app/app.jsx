import React, {PureComponent} from "react";

import {MainPage} from "../main-page/main-page.jsx";
import {MovieDetailsPage} from "../movie-details-page/movie-details-page.jsx";
import {PageType} from "../../const.js";
import {Switch, Route, BrowserRouter} from "react-router-dom";


export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePage: PageType.MAIN,
      activeMovie: null,
    };

    this.openMovieDetailsPage = this.openMovieDetailsPage.bind(this);
  }

  openMovieDetailsPage(movie) {
    this.setState({
      activeMovie: movie,
      activePage: PageType.MOVIE_DETAILS,
    });
  }

  renderPage() {
    const {activePage, activeMovie} = this.state;

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
