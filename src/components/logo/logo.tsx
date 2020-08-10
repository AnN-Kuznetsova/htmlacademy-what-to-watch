import PropTypes from "prop-types";
import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
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

  return (
    <div className="logo">
      <Link
        className={`logo__link ${mode === LogoMode.LIGHT && `logo__link--light`}`}
        to={AppRoute.MAIN}
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
    dispatch(ApplicationActionCreator.changeActivePage(PageType.MAIN));
  },
});

const Logo = connect(null, mapDispatchToProps)(LogoComponent);


export {
  LogoComponent,
  Logo,
};
