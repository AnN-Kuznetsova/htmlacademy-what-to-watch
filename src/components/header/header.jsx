import PropTypes from "prop-types";
import React from "react";


export const Header = (props) => {
  const {isMainPageLink} = props;
  const mainPageLink = isMainPageLink ? {href: `/`} : null;

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

        <div className="user-block">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};


Header.defaultProps = {
  isMainPageLink: true,
};

Header.propTypes = {
  isMainPageLink: PropTypes.bool.isRequired,
};
