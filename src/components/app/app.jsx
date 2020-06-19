import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {MainPage} from "../main-page/main-page.jsx";


export class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {promoMovie, films} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <MainPage
              promoMovie={promoMovie}
              films={films}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
    /* return (
      <MainPage
        promoMovie={promoMovie}
        movieTitles={movieTitles}
      />
    ); */
  }
}


App.propTypes = {
  promoMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.instanceOf(Date).isRequired,
    posterUrl: PropTypes.string.isRequired,
    backgroundUrl: PropTypes.string.isRequired,
  }).isRequired,
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  })).isRequired,
};
