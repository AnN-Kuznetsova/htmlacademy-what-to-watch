import React from "react";

import {Catalog} from "../catalog/catalog";
import {FilterByGenre} from "../filter-by-genre/filter-by-genre";
import {Footer} from "../footer/footer";
import {MovieCardPromoWithPlayer} from "../movie-card-promo/movie-card-promo";
import {MoviePropType} from "../../prop-types";


export const MainPage = (props) => {
  const {promoMovie} = props;

  return (
    <React.Fragment>
      <MovieCardPromoWithPlayer movie={promoMovie} />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">
            Catalog
          </h2>

          <FilterByGenre />

          <Catalog />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};


MainPage.propTypes = {
  promoMovie: MoviePropType.isRequired,
};
