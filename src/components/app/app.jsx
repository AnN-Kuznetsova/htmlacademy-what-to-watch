import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {MainPage} from "../main-page/main-page.jsx";
import {MoviePropType} from "../../prop-types.js";


export class App extends PureComponent {
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
  }
}


App.propTypes = {
  promoMovie: MoviePropType.isRequired,
  films: PropTypes.arrayOf(MoviePropType).isRequired,
};
