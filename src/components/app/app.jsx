import {array, arrayOf, shape, string, instanceOf} from "prop-types";
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
  promoMovie: shape({
    title: string.isRequired,
    smallPictureUrl: string.isRequired,
    backgroundUrl: string.isRequired,
    posterUrl: string.isRequired,
    genre: string.isRequired,
    releaseDate: instanceOf(Date).isRequired,
    description: string.isRequired,
    director: string.isRequired,
    starring: arrayOf(string).isRequired,
    runTime: string.isRequired,
    reviews: array.isRequired,
  }).isRequired,
  films: arrayOf(shape({
    title: string.isRequired,
    smallPictureUrl: string.isRequired,
    backgroundUrl: string.isRequired,
    posterUrl: string.isRequired,
    genre: string.isRequired,
    releaseDate: instanceOf(Date).isRequired,
    description: string.isRequired,
    director: string.isRequired,
    starring: arrayOf(string).isRequired,
    runTime: string.isRequired,
    reviews: array.isRequired,
  })).isRequired,
};
