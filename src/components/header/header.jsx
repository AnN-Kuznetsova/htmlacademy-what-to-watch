import PropTypes from "prop-types";
import React from "react";

import {Logo, LogoMode} from "../logo/logo";


export const HeaderMode = {
  SIGN_IN: `SIGN_IN`,
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`,
};


export const Header = (props) => {
  const {mode} = props;

  return (
    <React.Fragment>
      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <Logo mode={LogoMode.NORMAL} />

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
