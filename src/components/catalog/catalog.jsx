import PropTypes from "prop-types";
import React from "react";

import {NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP} from "../../const";
import {MoviePropType} from "../../prop-types";
import {SmallMovieCardWithVideoPlayer} from "../small-movie-card/small-movie-card";
import {ShowMoreButton} from "../show-more-button/show-more-button";
import {genreNames} from "../../mocks/genre-names";
import {withFilter} from "../../hocs/with-filter/with-filter";
import {FilterType} from "../../const";


const Catalog = (props) => {
  const {
    movies,
    onSmallMovieCardClick,
    renderFilter,
  } = props;

  const handleShowMoreButtonClick = () => {};

  return (
    <React.Fragment>
      {renderFilter && renderFilter(genreNames)}

      <div className="catalog__movies-list">
        {
          movies.map((movie, index) =>
            <SmallMovieCardWithVideoPlayer
              key={movie.title + index}
              movie={movie}
              onClick={onSmallMovieCardClick}
            />
          )
        }
      </div>

      {
        (movies.length > NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP) &&
        <ShowMoreButton onClick={handleShowMoreButtonClick} />
      }
    </React.Fragment>
  );
};


const CatalogWithFilterByGenre = withFilter(Catalog, FilterType.GENRE);


export {
  Catalog,
  CatalogWithFilterByGenre,
};


Catalog.propTypes = {
  movies: PropTypes.arrayOf(MoviePropType).isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
  renderFilter: PropTypes.func,
};
