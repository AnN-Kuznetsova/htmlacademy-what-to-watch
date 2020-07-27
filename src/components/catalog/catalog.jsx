import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducers/application/application";
import {MoviePropType} from "../../prop-types";
import {SmallMovieCardWithVideoPlayer} from "../small-movie-card/small-movie-card";
import {ShowMoreButton} from "../show-more-button/show-more-button";
import {getFilteredMoviesByGenre} from "../../reducers/data/selectors";
import {getVisibleMoviesCount} from "../../reducers/application/selectors";


const CatalogComponent = (props) => {
  const {
    movies,
    visibleCardCount,
    onSmallMovieCardClick,
    onShowMoreButtonClick,
  } = props;

  return (
    <React.Fragment>
      <div className="catalog__movies-list">
        {movies.slice(0, visibleCardCount)
          .map((movie, index) =>
            <SmallMovieCardWithVideoPlayer
              key={movie.title + index}
              movie={movie}
              onClick={onSmallMovieCardClick}
            />
          )}
      </div>

      {
        (movies.length > visibleCardCount) &&
        <ShowMoreButton onClick={onShowMoreButtonClick} />
      }
    </React.Fragment>
  );
};


CatalogComponent.propTypes = {
  movies: PropTypes.arrayOf(MoviePropType).isRequired,
  visibleCardCount: PropTypes.number.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  movies: getFilteredMoviesByGenre(state),
  visibleCardCount: getVisibleMoviesCount(state),
});

const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick() {
    dispatch(ActionCreator.incrementVisibleMoviesCount());
  },
});

const Catalog = connect(mapStateToProps, mapDispatchToProps)(CatalogComponent);


export {
  CatalogComponent,
  Catalog,
};
