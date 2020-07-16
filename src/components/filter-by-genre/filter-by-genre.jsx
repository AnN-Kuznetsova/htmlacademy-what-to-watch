import PropTypes from "prop-types";
import React, {PureComponent} from 'react';
import {connect} from "react-redux";

import {MAX_FILTER_ELEMENTS_COUNT} from "../../const";
import {ActionCreator} from "../../reducers/reducer";
import {MoviePropType} from "../../prop-types";
import {FilterItem} from '../filter-item/filter-item';


const getGenreFilterNames = (movies) => {
  const filtersCount = MAX_FILTER_ELEMENTS_COUNT;
  const filterNames = new Set();

  movies.forEach((movie) => {
    movie.genres.forEach((genre) => filterNames.add(genre));
  });

  return [`All genres`].concat(Array.from(filterNames))
    .splice(0, filtersCount);
};


const FilterByGenreComponent = (props) => {
  const {
    movies,
    activeFilter,
    onClick,
  } = props;

  const filterNames = getGenreFilterNames(movies);

  return (
    <ul className="catalog__genres-list">
      {
        filterNames.map((filterName, index) =>
          <FilterItem
            key={filterName + index}
            filterName={filterName}
            onClick={onClick}
            isActive={filterName === activeFilter}
          />
        )
      }
    </ul>
  );
};


FilterByGenreComponent.propTypes = {
  movies: PropTypes.arrayOf(MoviePropType).isRequired,
  activeFilter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  movies: state.movies,
  activeFilter: state.genre,
});

const mapDispatchToProps = (dispatch) => ({
  onClick(newFilterValue) {
    dispatch(ActionCreator.changeGenre(newFilterValue));
  },
});

const FilterByGenre = connect(mapStateToProps, mapDispatchToProps)(FilterByGenreComponent);


export {
  FilterByGenreComponent,
  FilterByGenre,
};
