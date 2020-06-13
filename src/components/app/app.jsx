import PropTypes from "prop-types";
import React from "react";
import {MainPage} from "../main-page/main-page.jsx";


export const App = (props) => {
  const {promoMovie, movieTitles} = props;

  return (
    <MainPage
      promoMovie={promoMovie}
      movieTitles={movieTitles}
    />
  );
};


App.propTypes = {
  promoMovie: PropTypes.object.isRequired,
  movieTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
