import PropTypes from "prop-types";
import React from "react";


export const HeaderMode = {
  SIGN_IN: `SIGN_IN`,
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`,
};


export const Header = (props) => {
  const {mode} = props;

  const isMainPage = window.location.pathname === `/`;
  const mainPageLink = isMainPage ? null : {href: `/`};

  return (
    <React.Fragment>
      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a {...mainPageLink} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        {mode === HeaderMode.AUTH &&
          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>}

        {mode === HeaderMode.NO_AUTH &&
          <div className="user-block">
            <a href="sign-in.html" className="user-block__link"
              onClick={() => {}}
            >Sign in</a>
          </div>}

        {mode === HeaderMode.SIGN_IN &&
          <h1 className="page-title user-page__title">Sign in</h1>}
      </header>
    </React.Fragment>
  );
};


Header.propTypes = {
  mode: PropTypes.string.isRequired,
};
