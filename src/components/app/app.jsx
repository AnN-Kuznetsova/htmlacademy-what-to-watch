import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {MainPage} from "../main-page/main-page.jsx";
import {MoviePage} from "../movie-page/movie-page.jsx";
import {MoviePropType} from "../../prop-types.js";


export class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderPage() {
    const {promoMovie, films} = this.props;

    return (
      <MainPage
        promoMovie={promoMovie}
        films={films}
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderPage()}
          </Route>
          <Route exact path="/movie-page">
            <MoviePage />
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
