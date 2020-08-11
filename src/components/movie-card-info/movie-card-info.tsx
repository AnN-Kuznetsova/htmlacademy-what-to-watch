import * as React from "react";

import {MovieDetails} from "../movie-details/movie-details";
import {MovieOverview} from "../movie-overview/movie-overview";
import {MovieReviews} from "../movie-reviews/movie-reviews";
import {MovieType} from "../../types";
import {withTabs} from "../../hocs/with-tabs/with-tabs";


interface Props {
  movie: MovieType;
  renderTabNav: (tabNames: string[]) => React.ReactNode;
  renderTab: (tabId: number, TabComponent: React.FunctionComponent, props: object, key: string) => React.ReactNode;
}


const tabList = [
  {
    name: `Overview`,
    component: MovieOverview,
  },
  {
    name: `Details`,
    component: MovieDetails,
  },
  {
    name: `Reviews`,
    component: MovieReviews,
  },
];


const MovieCardInfo: React.FunctionComponent<Props> = (props: Props) => {
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
