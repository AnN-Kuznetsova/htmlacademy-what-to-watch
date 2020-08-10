import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {AppRoute} from "../../const";
import {PageType} from "../../types";


const LogoMode = {
  NORMAL: `NORMAL`,
  LIGHT: `LIGHT`,
};


interface Props {
  mode: string;
  onClick: () => void;
}


const LogoComponent: React.FunctionComponent<Props> = (props: Props) => {
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


const mapDispatchToProps = (dispatch) => ({
  onClick() {
    dispatch(ApplicationActionCreator.changeActivePage(PageType.MAIN));
  },
});

const Logo = connect(null, mapDispatchToProps)(LogoComponent);


export {
  LogoMode,
  LogoComponent,
  Logo,
};
