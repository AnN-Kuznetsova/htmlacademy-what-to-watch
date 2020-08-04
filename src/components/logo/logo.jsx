import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {ActionCreator as DataActionCtrator} from "../../reducers/data/data";
import {AppRoute, PageType} from "../../const";


export const LogoMode = {
  NORMAL: `NORMAL`,
  LIGHT: `LIGHT`,
};


const LogoComponent = (props) => {
  const {
    mode,
    onClick,
  } = props;

  const isMainPage = window.location.pathname === AppRoute.MAIN;
  const mainPageLink = isMainPage ? `` : AppRoute.MAIN;

  return (
    <div className="logo">
      <Link
        className={`logo__link ${mode === LogoMode.LIGHT && `logo__link--light`}`}
        to={mainPageLink}
        onClick={onClick}
        style={isMainPage ? {pointerEvents: `none`} : {}}
      >
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
};


LogoComponent.propTypes = {
  mode: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  onClick() {
    dispatch(DataActionCtrator.setMaxMoviesCount(null));
    dispatch(ApplicationActionCreator.resetVisibleMoviesCount());
    dispatch(ApplicationActionCreator.changeGenre(`All genres`));
    dispatch(ApplicationActionCreator.changeActivePage(PageType.MAIN));
  },
});

const Logo = connect(null, mapDispatchToProps)(LogoComponent);


export {
  LogoComponent,
  Logo,
};
