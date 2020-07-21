import PropTypes from "prop-types";
import React from "react";

import {Catalog} from "../catalog/catalog";
import {Footer} from "../footer/footer";
import {MovieCardFullWithPlayer} from "../movie-card-full/movie-card-full";
import {MoviePropType} from "../../prop-types";
import {VideoPlayerMode} from "../../hocs/with-video/with-video";


export const MovieDetailsPage = (props) => {
  const {
    activeMovie,
    onSmallMovieCardClick,
  } = props;

  return (
    <React.Fragment>
      <MovieCardFullWithPlayer
        movie={activeMovie}
        playerMode={VideoPlayerMode.SMALL_SCREEN}
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
};
