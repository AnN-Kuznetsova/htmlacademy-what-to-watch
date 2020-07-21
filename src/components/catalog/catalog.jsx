import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducers/reducer";
import {MoviePropType} from "../../prop-types";
import {SmallMovieCardWithVideoPlayer} from "../small-movie-card/small-movie-card";
import {ShowMoreButton} from "../show-more-button/show-more-button";
import { VideoPlayerMode } from "../../hocs/with-video/with-video";


const CatalogComponent = (props) => {
  const {
    movieList,
    visibleCardCount,
    onSmallMovieCardClick,
    onShowMoreButtonClick,
  } = props;

  return (
    <React.Fragment>
      <div className="catalog__movies-list">
        {movieList.slice(0, visibleCardCount)
          .map((movie, index) =>
            <SmallMovieCardWithVideoPlayer
              key={movie.title + index}
              movie={movie}
              onClick={onSmallMovieCardClick}
              playerMode={VideoPlayerMode.PREVIEW}
            />
          )}
      </div>

      {
        (movieList.length > visibleCardCount) &&
        <ShowMoreButton onClick={onShowMoreButtonClick} />
      }
    </React.Fragment>
  );
};


CatalogComponent.propTypes = {
  movieList: PropTypes.arrayOf(MoviePropType).isRequired,
  visibleCardCount: PropTypes.number.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  movieList: state.movieList,
  visibleCardCount: state.visibleMoviesCount,
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
