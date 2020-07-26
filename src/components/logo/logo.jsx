import PropTypes from "prop-types";
import React from "react";


export const LogoMode = {
  NORMAL: `NORMAL`,
  LIGHT: `LIGHT`,
};


export const Logo = (props) => {
  const {mode} = props;

  const isMainPage = window.location.pathname === `/`;
  const mainPageLink = isMainPage ? null : {href: `/`};

  return (
    <div className="logo">
      <a {...mainPageLink} className={`logo__link ${mode === LogoMode.LIGHT && `logo__link--light`}`}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>
  );
};


Logo.propTypes = {
  mode: PropTypes.string.isRequired,
};
