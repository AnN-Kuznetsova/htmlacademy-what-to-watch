import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";

import {NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP} from "../../const";
import {ActionCreator} from "../../reducers/reducer";
import {MoviePropType} from "../../prop-types";
import {SmallMovieCardWithVideoPlayer} from "../small-movie-card/small-movie-card";
import {ShowMoreButton} from "../show-more-button/show-more-button";
import {genreNames} from "../../mocks/genre-names";
import {withFilter} from "../../hocs/with-filter/with-filter";


const CatalogComponent = (props) => {
  const {
    movies,
    onSmallMovieCardClick,
    renderFilter,
    activeFilter,
    onFilterClick,
  } = props;

  const handleShowMoreButtonClick = () => {};

  return (
    <React.Fragment>
      {renderFilter && renderFilter(genreNames, onFilterClick, activeFilter)}

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


CatalogComponent.propTypes = {
  movies: PropTypes.arrayOf(MoviePropType).isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
  renderFilter: PropTypes.func,
  activeFilter: PropTypes.string.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  activeFilter: state.genre,
});

const mapDispatchToProps = (dispatch) => ({
  onFilterClick(newFilterValue) {
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
