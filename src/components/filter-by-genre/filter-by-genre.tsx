
import * as React from 'react';
import {connect} from "react-redux";

import {MAX_FILTER_ELEMENTS_COUNT} from "../../const";
import {ActionCreator} from "../../reducers/application/application";
import {FilterItem} from '../filter-item/filter-item';
import {MovieType} from '../../types';
import {getMovies} from "../../reducers/data/selectors";
import {getActiveGenre} from "../../reducers/application/selectors";


interface Props {
  movies: MovieType[];
  activeFilter: string;
  onClick: () => void;
}


const getGenreFilterNames = (movies: MovieType[]) => {
  const filtersCount: number = MAX_FILTER_ELEMENTS_COUNT;
  const filterNames: Set<string> = new Set();

  movies.forEach((movie) => {
    movie.genres.forEach((genre) => filterNames.add(genre));
  });

  return [`All genres`].concat(Array.from(filterNames))
    .splice(0, filtersCount);
};


const FilterByGenreComponent: React.FunctionComponent<Props> = (props: Props) => {
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


const mapStateToProps = (state) => ({
  movies: getMovies(state),
  activeFilter: getActiveGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClick(newFilterValue) {
    dispatch(ActionCreator.changeGenre(newFilterValue));
    dispatch(ActionCreator.resetVisibleMoviesCount());
  },
});

const FilterByGenre = connect(mapStateToProps, mapDispatchToProps)(FilterByGenreComponent);


export {
  FilterByGenreComponent,
  FilterByGenre,
};
