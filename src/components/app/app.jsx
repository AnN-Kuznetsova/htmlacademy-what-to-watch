import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {MainPage} from "../main-page/main-page.jsx";


export class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {promoMovie, movieTitles} = this.props;

    return (
      <MainPage
        promoMovie={promoMovie}
        movieTitles={movieTitles}
      />
    );
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
  movieTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
