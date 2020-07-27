import MockAdapter from "axios-mock-adapter";

import {ActionType as ApplicationActionType} from "../application/application";
import {PageType} from "../../const";
import {createAPI} from "../../api";
import {reducer, ActionType, ActionCreator, AuthorizationStatus, Operation} from "./user";


describe(`User reducer should work correctly`, () => {
  it(`User reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      loginError: null,
    });
  });


  it(`User reducer should change authorizationStatus by a given value`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    });
  });


  it(`User reducer should change loginError by a given value`, () => {
    expect(reducer({
      loginError: null,
    }, {
      type: ActionType.SET_LOGIN_ERROR,
      payload: {status: 400},
    })).toEqual({
      loginError: {status: 400},
    });

    expect(reducer({
      loginError: {status: 400},
    }, {
      type: ActionType.SET_LOGIN_ERROR,
      payload: null,
    })).toEqual({
      loginError: null,
    });
  });
});


describe(`User action creators should work correctly`, () => {
  it(`User action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });


  it(`User action creator for set login error returns correct action`, () => {
    expect(ActionCreator.setLoginError({status: 400})).toEqual({
      type: ActionType.SET_LOGIN_ERROR,
      payload: {status: 400},
    });
  });
});


describe(`User operation work correctly`, () => {
  it(`Should make a correct API call to /login on positive authentication check`, () => {
    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authVerifier = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200);

    return authVerifier(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });


  it(`Should make a correct API call to /login on negative authentication check`, () => {
    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authVerifier = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(400, {data: false});

    return authVerifier(dispatch, () => {}, api)
      .then()
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(0);
      });
  });


  it(`Should make a correct API call to /login with post request`, () => {
    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authData = {
      email: `email`,
      password: `password`,
    };
    const loginSender = Operation.login(authData);

    apiMock
      .onPost(`/login`, {
        email: authData.email,
        password: authData.password,
      })
      .reply(200);

    return loginSender(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_LOGIN_ERROR,
          payload: null,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ApplicationActionType.CHANGE_ACTIVE_PAGE,
          payload: PageType.MAIN,
        });
      });
  });
});
