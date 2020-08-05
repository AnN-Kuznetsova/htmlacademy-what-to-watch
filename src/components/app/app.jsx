import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {ActionCreator as DataActionCtrator} from "../../reducers/data/data";
import {AddReviewPageWithNewReview} from "../add-review-page/add-review-page";
import {ErrorPage} from "../error-page/error-page";
import {MainPage} from "../main-page/main-page";
import {MovieDetailsPage} from "../movie-details-page/movie-details-page";
import {MoviePropType} from "../../prop-types";
import {PageType, AppRoute} from "../../const";
import {PlayerPage} from "../player-page/player-page";
import {PrivateRoute} from "../private-route/private-route";
import {RedirectToMainRoute} from "../redirect-to-main-route/redirect-to-main-route";
import {SignIn} from "../sign-in/sign-in";
import {getActivePage} from "../../reducers/application/selectors";
import {getDataError, getMovies, getPromoMovie} from "../../reducers/data/selectors";
import {history} from "../../history";


class AppComponent extends PureComponent {
  renderPage() {
    const {
      dataError,
      activePage,
      movies,
      promoMovie,
      onError,
    } = this.props;

    window.scrollTo(0, 0);

    switch (activePage) {
      case PageType.MAIN: {
        if (movies && promoMovie) {
          return (
            <MainPage />
          );
        }
        onError({status: 400});
        return (<Redirect to={AppRoute.MAIN} />);
      }

      case PageType.ERROR:
        return (
          <ErrorPage dataError={dataError} />
        );

      default:
        return null;
    }
  }

  render() {
    const {
      onError
    } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.MAIN}>
            {this.renderPage()}
          </Route>

          <RedirectToMainRoute exact path={AppRoute.FILM}
            render={(routeProps) => {
              return (
                <MovieDetailsPage routeProps={routeProps} />
              );
            }}
          />

          <RedirectToMainRoute exact path={AppRoute.PLAYER}
            render={(routeProps) => {
              return (
                <PlayerPage routeProps={routeProps} />
              );
            }}
          />

          <RedirectToMainRoute exact path={AppRoute.SIGN_IN}
            render={() => {
              return (<SignIn />);
            }}
          />

          <PrivateRoute exact path={AppRoute.ADD_REVIEW}
            render={(routeProps) => {
              return (
                <AddReviewPageWithNewReview routeProps={routeProps} />
              );
            }}
          />

          <Route
            render={() => {
              onError({status: 404});
              return (<Redirect to={AppRoute.MAIN} />);
            }}
          />
        </Switch>
      </Router>
    );
  }
}


AppComponent.propTypes = {
  dataError: PropTypes.object,
  activePage: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(MoviePropType),
  promoMovie: MoviePropType,
  onError: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  dataError: getDataError(state),
  activePage: getActivePage(state),
  movies: getMovies(state),
  promoMovie: getPromoMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  onError(error) {
    dispatch(DataActionCtrator.setDataError(error));
    dispatch(ApplicationActionCreator.changeActivePage(PageType.ERROR));
  }
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);


export {
  AppComponent,
  App,
};
