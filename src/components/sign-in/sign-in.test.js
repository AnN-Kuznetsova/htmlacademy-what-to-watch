import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {AuthorizationStatus} from "../../reducers/user/user";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../const";
import {SignInComponent, SignInError} from "./sign-in";


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
  login: () => {},
  loginError: null,
  setLoginError: () => {},
};


describe(`Render SignIn`, () => {
  it(`SignIn should match with snapshot when loginError is null`, () => {
    const signInSnapshot = renderer.create(
        <Provider store={store} >
          <SignInComponent {...props} />
        </Provider>
    ).toJSON();

    expect(signInSnapshot).toMatchSnapshot();
  });


  it(`SignIn should match with snapshot when loginError is "EMAIL_VALIDATION"`, () => {
    props.loginError = {
      response: SignInError.EMAIL_VALIDATION,
    };

    const signInSnapshot = renderer.create(
        <Provider store={store} >
          <SignInComponent {...props} />
        </Provider>
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
        <Provider store={store} >
          <SignInComponent {...props} />
        </Provider>
    ).toJSON();

    expect(signInSnapshot).toMatchSnapshot();
  });
});
