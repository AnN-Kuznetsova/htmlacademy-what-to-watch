import PropTypes from "prop-types";
import React from "react";

import {Catalog} from "../catalog/catalog";
import {Footer} from "../footer/footer";
import {MovieCardFullWithPlayer} from "../movie-card-full/movie-card-full";
import {MoviePropType} from "../../prop-types";


export const MovieDetailsPage = (props) => {
  const {
    activeMovie,
    onSmallMovieCardClick,
    onAddReviewButtonClick,
  } = props;

  return (
    <React.Fragment>
      <MovieCardFullWithPlayer
        movie={activeMovie}
        onAddReviewButtonClick={onAddReviewButtonClick}
      />

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">
            More like this
          </h2>

          <Catalog
            onSmallMovieCardClick={onSmallMovieCardClick}
          />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};


MovieDetailsPage.propTypes = {
  activeMovie: MoviePropType.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
  onAddReviewButtonClick: PropTypes.func.isRequired,
};
