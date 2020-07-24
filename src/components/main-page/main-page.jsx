import React from "react";
import PropTypes from "prop-types";

import {Catalog} from "../catalog/catalog";
import {FilterByGenre} from "../filter-by-genre/filter-by-genre";
import {Footer} from "../footer/footer";
import {MovieCardPromoWithPlayer} from "../movie-card-promo/movie-card-promo";
import {MoviePropType} from "../../prop-types";


export const MainPage = (props) => {
  const {promoMovie, openMovieDetailsPage} = props;

  const handleSmallMovieCardClick = (movie) => {
    openMovieDetailsPage(movie);
  };

  const handlePromoMovieClick = () => {
    openMovieDetailsPage(promoMovie);
  };

  return (
    <React.Fragment>
      <MovieCardPromoWithPlayer
        movie={promoMovie}
        onMovieClick={handlePromoMovieClick}
      />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">
            Catalog
          </h2>

          <FilterByGenre />

          <Catalog
            onSmallMovieCardClick={handleSmallMovieCardClick}
          />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};


MainPage.propTypes = {
  promoMovie: MoviePropType.isRequired,
  openMovieDetailsPage: PropTypes.func.isRequired,
};
