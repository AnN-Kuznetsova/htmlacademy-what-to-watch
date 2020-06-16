import PropTypes from "prop-types";
import React from "react";
import {SmallMovieCard} from "../small-movie-card/small-movie-card.jsx";


const handleSmallMovieCardClick = (evt) => {
  evt.preventDefault();
  window.console.log(`SmallMovieCardClick`);
};


export const CatalogMoviesList = (props) => {
  const {movieTitles} = props;

  return (
    <div className="catalog__movies-list">
      {
        movieTitles.map((movieTitle, index) =>
          <SmallMovieCard
            key={movieTitle + index}
            movieTitle={movieTitle}
            onSmallMovieCardClick={handleSmallMovieCardClick}
          />
        )
      }
    </div>
  );
};


CatalogMoviesList.propTypes = {
  movieTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
