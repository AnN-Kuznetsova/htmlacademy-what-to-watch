import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {connect} from "react-redux";

import {AppRoute} from "../../const";
import {MovieType} from "../../types";
import {getMovies, getPromoMovie} from "../../reducers/data/selectors";


type Props = RouteProps & {
  render: () => React.ReactNode;
  movies: MovieType[];
  promoMovie: MovieType;
};


const RedirectToMainRouteComponent: React.FunctionComponent<Props> = (props: Props) => {
  const {
    render,
    path,
    exact,
    movies,
    promoMovie,
  } = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (
          movies && promoMovie
            ? render(routeProps)
            : <Redirect to={AppRoute.MAIN} />
        );
      }}
    />
  );
};


const mapStateToProps = (state) => ({
  movies: getMovies(state),
  promoMovie: getPromoMovie(state),
});

const RedirectToMainRoute = connect(mapStateToProps)(RedirectToMainRouteComponent);


export {
  RedirectToMainRouteComponent,
  RedirectToMainRoute,
};
