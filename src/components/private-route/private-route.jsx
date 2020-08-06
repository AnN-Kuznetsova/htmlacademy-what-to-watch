import PropTypes from "prop-types";
import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {AppRoute} from "../../const";
import {AuthorizationStatus} from "../../reducers/user/user";
import {getAuthorizationStatus} from "../../reducers/user/selectors";


const PrivateRouteComponent = (props) => {
  const {
    render,
    path,
    exact,
    authorizationStatus,
  } = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render(routeProps)
            : <Redirect to={AppRoute.SIGN_IN} />
        );
      }}
    />
  );
};


PrivateRouteComponent.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const PrivateRoute = connect(mapStateToProps)(PrivateRouteComponent);


export {
  PrivateRouteComponent,
  PrivateRoute,
};
