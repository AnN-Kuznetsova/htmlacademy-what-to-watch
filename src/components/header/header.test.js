import React from "react";
import renderer from "react-test-renderer";

import {AuthorizationStatus} from "../../reducers/user/user";
import {HeaderComponent} from "./header";
import {PageType} from "../../const";


global.window = Object.create(window);


describe(`Render Header`, () => {
  // TO DO: воостановить после настройки маршрутов
  /* it(`Should match with snapshot when window.location is MainPage`, () => {
    Object.defineProperty(window, `location`, {
      value: {
        pathname: `/`
      }
    });

    const headerSnapshot = renderer.create(
        <HeaderComponent mode={HeaderMode.AUTH} />
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when window.location is not MainPage`, () => {
    window.location.pathname = `/page-name`;

    const headerSnapshot = renderer.create(
        <HeaderComponent mode={HeaderMode.AUTH} />
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  }); */


  it(`Should match with snapshot when authorizationStatus is "AUTH"`, () => {
    // window.location.pathname = `/`;
    const props = {
      authorizationStatus: AuthorizationStatus.AUTH,
      activePage: PageType.MAIN,
      onOpenSignInPage: () => {},
    };

    const headerSnapshot = renderer.create(
        <HeaderComponent {...props} />
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when authorizationStatus is "NO_AUTH"`, () => {
    const props = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      activePage: PageType.MAIN,
      onOpenSignInPage: () => {},
    };

    const headerSnapshot = renderer.create(
        <HeaderComponent {...props} />
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when active page is "SIGN_IN"`, () => {
    const props = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      activePage: PageType.SIGN_IN,
      onOpenSignInPage: () => {},
    };

    const headerSnapshot = renderer.create(
        <HeaderComponent {...props} />
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when active page is "ERROR"`, () => {
    const props = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      activePage: PageType.ERROR,
      onOpenSignInPage: () => {},
    };

    const headerSnapshot = renderer.create(
        <HeaderComponent {...props} />
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });
});
