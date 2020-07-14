import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";

import {NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP, MAX_FILTER_ELEMENTS_COUNT} from "../../const";
import {ActionCreator} from "../../reducers/reducer";
import {MoviePropType} from "../../prop-types";
import {SmallMovieCardWithVideoPlayer} from "../small-movie-card/small-movie-card";
import {ShowMoreButton} from "../show-more-button/show-more-button";
import {withFilter} from "../../hocs/with-filter/with-filter";


const getGenreFilterNames = (movies) => {
  const filtersCount = MAX_FILTER_ELEMENTS_COUNT;
  const filterNames = new Set();

  movies.forEach((movie) => {
    movie.genres.forEach((genre) => filterNames.add(genre));
  });

  return [`All genres`].concat(Array.from(filterNames))
    .splice(0, filtersCount);
};


const CatalogComponent = (props) => {
  const {
    movies,
    movieList,
    onSmallMovieCardClick,
    renderFilter,
    activeFilter,
    onGenreFilterClick,
  } = props;

  const handleShowMoreButtonClick = () => {};

  return (
    <React.Fragment>
      {renderFilter && renderFilter(getGenreFilterNames(movies), onGenreFilterClick, activeFilter)}

      <div className="catalog__movies-list">
        {
          movieList.map((movie, index) =>
            <SmallMovieCardWithVideoPlayer
              key={movie.title + index}
              movie={movie}
              onClick={onSmallMovieCardClick}
            />
          )
        }
      </div>

      {
        (movieList.length > NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP) &&
        <ShowMoreButton onClick={handleShowMoreButtonClick} />
      }
    </React.Fragment>
  );
};


CatalogComponent.propTypes = {
  movies: PropTypes.arrayOf(MoviePropType).isRequired,
  movieList: PropTypes.arrayOf(MoviePropType).isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
  renderFilter: PropTypes.func,
  activeFilter: PropTypes.string.isRequired,
  onGenreFilterClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  activeFilter: state.genre,
  movies: state.movies,
  movieList: state.movieList,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreFilterClick(newFilterValue) {
    dispatch(ActionCreator.changeGenre(newFilterValue));
    dispatch(ActionCreator.getMovies());
  },
});

const Catalog = connect(mapStateToProps, mapDispatchToProps)(CatalogComponent);
const CatalogWithFilterByGenre = withFilter(Catalog);


export {
  CatalogComponent,
  Catalog,
  CatalogWithFilterByGenre,
};
