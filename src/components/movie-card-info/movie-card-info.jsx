import PropTypes from "prop-types";
import React from "react";

import {MovieOverview} from "../movie-overview/movie-overview";
import {MoviePropType} from "../../prop-types";
import {withTabs} from "../../hocs/with-tabs/with-tabs";


const tabList = [
  {
    name: `Overview`,
    component: MovieOverview,
  },
  {
    name: `Details`,
    component: null,
  },
  {
    name: `Reviews`,
    component: null,
  },
];


const MovieCardInfo = (props) => {
  const {
    movie,
    renderTabNav,
    renderTab,
  } = props;

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <div className="movie-card__poster movie-card__poster--big">
          <img src={movie.posterUrl} alt={`${movie.title} poster`} width="218" height="327" />
        </div>

        <div className="movie-card__desc">
          {renderTabNav(tabList.map((tab) => tab.name))}
          {tabList.map((tab, index) => renderTab(index, tab.component, {movie}, `${tab.name + index}`))}
          {/* <nav className="movie-nav movie-card__nav">
            <ul className="movie-nav__list">
              {tabList.map((tab, index) => (
                <li key={tab.name + index} className="movie-nav__item movie-nav__item--active">
                  <a href="#" className="movie-nav__link">{tab.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          <MovieOverview movie={movie} /> */}
        </div>
      </div>
    </div>
  );
};


const MovieCardInfoWithTabs = withTabs(MovieCardInfo);


export {
  MovieCardInfo,
  MovieCardInfoWithTabs,
};


MovieCardInfo.propTypes = {
  movie: MoviePropType.isRequired,
  renderTabNav: PropTypes.func.isRequired,
  renderTab: PropTypes.func.isRequired,
};


