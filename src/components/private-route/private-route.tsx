import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {connect} from "react-redux";

import {AppRoute} from "../../const";
import {AuthorizationStatus} from "../../reducers/user/user";
import {getAuthorizationStatus} from "../../reducers/user/selectors";


type Props = RouteProps & {
  render: () => React.ReactNode;
  authorizationStatus: string;
}


const PrivateRouteComponent: React.FunctionComponent<Props> = (props: Props) => {
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


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const PrivateRoute = connect(mapStateToProps)(PrivateRouteComponent);


export {
  PrivateRouteComponent,
  PrivateRoute,
};
