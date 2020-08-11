import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import {AuthorizationStatus} from "../../reducers/user/user";
import {Error} from "../../api";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../types";
import {SignInComponent} from "./sign-in";
import {history} from "../../history";
import {noop} from "../../utils/utils";


const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.APPLICATION]: {
    activePage: PageType.SIGN_IN,
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  },
});

const props = {
  loginError: null,
  login: noop,
  setLoginError: noop,
  onOpenSignInPage: noop,
};


describe(`Render SignIn`, () => {
  it(`SignIn should match with snapshot when loginError is null`, () => {
    const signInSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <SignInComponent {...props} />
          </Provider>
        </Router>
    ).toJSON();

    expect(signInSnapshot).toMatchSnapshot();
  });


  it(`SignIn should match with snapshot when loginError is "EMAIL_VALIDATION"`, () => {
    props.loginError = {
      response: Error.VALIDATION,
    };

    const signInSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <SignInComponent {...props} />
          </Provider>
        </Router>
    ).toJSON();

    expect(signInSnapshot).toMatchSnapshot();
  });


  it(`SignIn should match with snapshot when loginError is "BAD_REQUEST"`, () => {
    props.loginError = {
      response: {
        status: 400,
      },
    };

    const signInSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <SignInComponent {...props} />
          </Provider>
        </Router>
    ).toJSON();

    expect(signInSnapshot).toMatchSnapshot();
  });
});
