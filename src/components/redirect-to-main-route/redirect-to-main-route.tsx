import PropTypes from "prop-types";
import * as React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {AppRoute} from "../../const";
import {MoviePropType} from "../../prop-types";
import {getMovies, getPromoMovie} from "../../reducers/data/selectors";


const RedirectToMainRouteComponent = (props) => {
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


RedirectToMainRouteComponent.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  movies: PropTypes.arrayOf(MoviePropType),
  promoMovie: MoviePropType,
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
