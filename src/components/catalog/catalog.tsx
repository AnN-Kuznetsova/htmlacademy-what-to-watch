
import * as React from "react";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducers/application/application";
import {MoviePropType} from "../../prop-types";
import {SmallMovieCardWithVideoPlayer} from "../small-movie-card/small-movie-card";
import {ShowMoreButton} from "../show-more-button/show-more-button";
import {getMoviesForCatalog} from "../../reducers/data/selectors";
import {getVisibleMoviesCount} from "../../reducers/application/selectors";


const CatalogComponent = (props) => {
  const {
    movies,
    visibleCardCount,
    onShowMoreButtonClick,
  } = props;

  if (movies && movies.length) {
    return (
      <React.Fragment>
        <div className="catalog__movies-list">
          {movies.slice(0, visibleCardCount)
            .map((movie, index) =>
              <SmallMovieCardWithVideoPlayer
                key={movie.title + index}
                movie={movie}
              />
            )}
        </div>

        {
          (movies.length > visibleCardCount) &&
          <ShowMoreButton onClick={onShowMoreButtonClick} />
        }
      </React.Fragment>
    );
  }

  return null;
};


CatalogComponent.propTypes = {
  movies: PropTypes.arrayOf(MoviePropType),
  visibleCardCount: PropTypes.number.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  movies: getMoviesForCatalog(state),
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
