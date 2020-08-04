import PropTypes from "prop-types";
import React from "react";

import {MoviePropType} from "../../prop-types";


export const ListButton = (props) => {
  const {movie} = props;

  return (
    <button className="btn btn--list movie-card__button" type="button">
      <svg viewBox="0 0 19 20" width="19" height="20">
        {movie.isFavorite
          && <use xlinkHref="#in-list" />
          || <use xlinkHref="#add" />}
      </svg>
      <span>My list</span>
    </button>
  );
};


ListButton.propTypes = {
  movie: MoviePropType.isRequired,
};
