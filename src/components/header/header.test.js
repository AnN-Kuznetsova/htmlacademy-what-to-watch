import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import {AuthorizationStatus} from "../../reducers/user/user";
import {HeaderComponent} from "./header";
import {PageType} from "../../const";
import {history} from "../../history";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


global.window = Object.create(window);

const mockStore = configureStore([]);
const store = mockStore({});


describe(`Render Header`, () => {
  it(`Should match with snapshot when authorizationStatus is "AUTH`, () => {
    const props = {
      authorizationStatus: AuthorizationStatus.AUTH,
      activePage: PageType.MAIN,
      onOpenSignInPage: () => {},
      onBreadcrambsLinkClick: () => {},
    };

    const headerSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <HeaderComponent {...props} />
          </Provider>
        </Router>
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when authorizationStatus is "NO_AUTH"`, () => {
    const props = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      activePage: PageType.MAIN,
      onOpenSignInPage: () => {},
      onBreadcrambsLinkClick: () => {},
    };

    const headerSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <HeaderComponent {...props} />
          </Provider>
        </Router>
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when active page is "SIGN_IN"`, () => {
    const props = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      activePage: PageType.SIGN_IN,
      onOpenSignInPage: () => {},
      onBreadcrambsLinkClick: () => {},
    };

    const headerSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <HeaderComponent {...props} />
          </Provider>
        </Router>
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when active page is "ERROR"`, () => {
    const props = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      activePage: PageType.ERROR,
      onOpenSignInPage: () => {},
      onBreadcrambsLinkClick: () => {},
    };

    const headerSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <HeaderComponent {...props} />
          </Provider>
        </Router>
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when active page is ADD_REVIEW`, () => {
    const props = {
      authorizationStatus: AuthorizationStatus.AUTH,
      activeMovie: mockPromoMovie,
      activePage: PageType.ADD_REVIEW,
      onOpenSignInPage: () => {},
      onBreadcrambsLinkClick: () => {},
    };

    const headerSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <HeaderComponent {...props} />
          </Provider>
        </Router>
    ).toJSON();

    expect(headerSnapshot).toMatchSnapshot();
  });
});
