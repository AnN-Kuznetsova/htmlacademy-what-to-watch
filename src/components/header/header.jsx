import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";

import {AuthorizationStatus} from "../../reducers/user/user";
import {ActionCreator} from "../../reducers/application/application";
import {Logo, LogoMode} from "../logo/logo";
import {PageType} from "../../const";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {getActivePage} from "../../reducers/application/selectors";


const HeaderComponent = (props) => {
  const {
    authorizationStatus,
    activePage,
    onOpenSignInPage,
  } = props;

  const isAuth = authorizationStatus === AuthorizationStatus.AUTH;
  const isSignIn = activePage === PageType.SIGN_IN;

  const handleSignInClick = (event) => {
    event.preventDefault();
    onOpenSignInPage();
  };

  return (
    <React.Fragment>
      <h1 className="visually-hidden">WTW</h1>

      <header className={`page-header ${isAuth && !isSignIn && `movie-card__head`} ${isSignIn && `user-page__head`}`}>
        <Logo mode={LogoMode.NORMAL} />

        {isAuth && !isSignIn &&
          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>}

        {!isAuth && !isSignIn &&
          <div className="user-block">
            <a href="sign-in.html" className="user-block__link"
              onClick={handleSignInClick}
            >Sign in</a>
          </div>}

        {isSignIn &&
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
