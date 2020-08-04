import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {AuthorizationStatus} from "../../reducers/user/user";
import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {ActionCreator as DataActionCreator, Operation} from "../../reducers/data/data";
import {Breadcrumbs} from "../breadcrumbs/breadcrumbs";
import {Logo, LogoMode} from "../logo/logo";
import {MoviePropType} from "../../prop-types";
import {PageType, AppRoute} from "../../const";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {getActivePage, getActiveMovie} from "../../reducers/application/selectors";


const HeaderComponent = (props) => {
  const {
    authorizationStatus,
    activeMovie,
    activePage,
    onOpenSignInPage,
    onBreadcrambsLinkClick,
  } = props;

  const renderBreadcrumbs = activePage === PageType.ADD_REVIEW;
  const renderAvatar = authorizationStatus === AuthorizationStatus.AUTH && activePage !== PageType.ERROR && activePage !== PageType.SIGN_IN;
  const renderSignInLink = authorizationStatus === AuthorizationStatus.NO_AUTH && activePage !== PageType.ERROR && activePage !== PageType.SIGN_IN;
  const renderSignInPage = activePage === PageType.SIGN_IN;

  const breadcrambsList = activeMovie ? [
    {
      link: AppRoute.FILM.replace(`:id`, activeMovie.id),
      onLinkClick: onBreadcrambsLinkClick.bind(null, activeMovie.id),
      title: activeMovie.title
    },
    {
      link: ``,
      title: `Add review`,
    }
  ] : [];

  return (
    <React.Fragment>
      <h1 className="visually-hidden">WTW</h1>

      <header className={`page-header ${renderAvatar && `movie-card__head`} ${renderSignInPage && `user-page__head`}`}>
        <Logo mode={LogoMode.NORMAL} />

        {renderBreadcrumbs &&
          <Breadcrumbs breadcrambsList={breadcrambsList} />}

        {renderAvatar &&
          <div className="user-block">
            <div className="user-block__avatar">
              <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>}

        {renderSignInLink &&
          <div className="user-block">
            <Link
              className="user-block__link"
              to={AppRoute.SIGN_IN}
              onClick={onOpenSignInPage}
            >Sign in</Link>
          </div>}

        {renderSignInPage &&
          <h1 className="page-title user-page__title">Sign in</h1>}
      </header>
    </React.Fragment>
  );
};


HeaderComponent.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  activeMovie: MoviePropType,
  activePage: PropTypes.string.isRequired,
  onOpenSignInPage: PropTypes.func.isRequired,
  onBreadcrambsLinkClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  activeMovie: getActiveMovie(state),
  activePage: getActivePage(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOpenSignInPage() {
    dispatch(ApplicationActionCreator.changeActivePage(PageType.SIGN_IN));
  },
  onBreadcrambsLinkClick(activeMovieId) {
    dispatch(DataActionCreator.setDataError(null));
    dispatch(Operation.loadActiveMovieReviews(activeMovieId));
    dispatch(ApplicationActionCreator.changeActivePage(PageType.MOVIE_DETAILS));
  },
});

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

export {
  HeaderComponent,
  Header,
};
