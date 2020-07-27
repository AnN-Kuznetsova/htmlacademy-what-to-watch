import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";

import {AuthorizationStatus} from "../../reducers/user/user";
import {ActionCreator} from "../../reducers/application/application";
import {Logo, LogoMode} from "../logo/logo";
import {PageType} from "../../const";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {getActivePage} from "../../reducers/application/selectors";


const HeaderMode = {
  ERROR_PAGE: `ERROR_PAGE`,
  SIGN_IN_PAGE: `SIGN_IN_PAGE`,
  MOVIE_CARD_AUTH: `MOVIE_CARD_AUTH`,
  MOVIE_CARD_NO_AUTH: `MOVIE_CARD_NO_AUTH`,
};

const getHeaderMode = (activePage, authorizationStatus) => {
  switch (true) {
    case activePage === PageType.ERROR:
      return HeaderMode.ERROR_PAGE;
    case activePage === PageType.SIGN_IN:
      return HeaderMode.SIGN_IN_PAGE;
    case authorizationStatus === AuthorizationStatus.AUTH:
      return HeaderMode.MOVIE_CARD_AUTH;
    case authorizationStatus === AuthorizationStatus.NO_AUTH:
    default:
      return HeaderMode.MOVIE_CARD_NO_AUTH;
  }
};


const HeaderComponent = (props) => {
  const {
    authorizationStatus,
    activePage,
    onOpenSignInPage,
  } = props;

  const headerMode = getHeaderMode(activePage, authorizationStatus);

  const handleSignInClick = (event) => {
    event.preventDefault();
    onOpenSignInPage();
  };

  return (
    <React.Fragment>
      <h1 className="visually-hidden">WTW</h1>

      <header className={`page-header ${headerMode === HeaderMode.MOVIE_CARD_AUTH && `movie-card__head`} ${headerMode === HeaderMode.SIGN_IN_PAGE && `user-page__head`}`}>
        <Logo mode={LogoMode.NORMAL} />

        {headerMode === HeaderMode.MOVIE_CARD_AUTH &&
          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>}

        {headerMode === HeaderMode.MOVIE_CARD_NO_AUTH &&
          <div className="user-block">
            <a href="sign-in.html" className="user-block__link"
              onClick={handleSignInClick}
            >Sign in</a>
          </div>}

        {headerMode === HeaderMode.SIGN_IN_PAGE &&
          <h1 className="page-title user-page__title">Sign in</h1>}
      </header>
    </React.Fragment>
  );
};


HeaderComponent.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  activePage: PropTypes.string.isRequired,
  onOpenSignInPage: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  activePage: getActivePage(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOpenSignInPage() {
    dispatch(ActionCreator.changeActivePage(PageType.SIGN_IN));
  },
});

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

export {
  HeaderComponent,
  Header,
};
