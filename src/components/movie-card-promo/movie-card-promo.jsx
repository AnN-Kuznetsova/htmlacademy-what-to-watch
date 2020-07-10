import PropTypes from "prop-types";
import React from "react";

import {MainPageHeader} from "../main-page-header/main-page-header";
import {MoviePropType} from "../../prop-types";


export const MovieCardPromo = (props) => {
  const {movie, onMovieClick} = props;

  return (
    <section className="movie-card">
      <MainPageHeader
        movie={movie}
        onMovieClick={onMovieClick}
      />
    </section>
  );
};


MovieCardPromo.propTypes = {
  movie: MoviePropType.isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
