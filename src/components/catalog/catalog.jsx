import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";

import {NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP} from "../../const";
import {MoviePropType} from "../../prop-types";
import {SmallMovieCardWithVideoPlayer} from "../small-movie-card/small-movie-card";
import {ShowMoreButton} from "../show-more-button/show-more-button";


const CatalogComponent = (props) => {
  const {
    movieList,
    onSmallMovieCardClick,
  } = props;

  const handleShowMoreButtonClick = () => {};

  return (
    <React.Fragment>
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
  movieList: PropTypes.arrayOf(MoviePropType).isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  movieList: state.movieList,
});

const Catalog = connect(mapStateToProps)(CatalogComponent);


export {
  CatalogComponent,
  Catalog,
};
