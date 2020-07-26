import {extend} from "../../utils/utils";


const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  loginError: null,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_LOGIN_ERROR: `SET_LOGIN_ERROR`,
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  setLoginError: (error) => ({
    type: ActionType.SET_LOGIN_ERROR,
    payload: error,
  }),
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
    .then(() => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.setLoginError(null));
    })
    .catch((error) => {
      dispatch(ActionCreator.setLoginError(error));
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });

    case ActionType.SET_LOGIN_ERROR:
      return extend(state, {
        loginError: action.payload
      });

    default:
      return state;
  }
};


export {
  ActionCreator,
  ActionType,
  AuthorizationStatus,
  Operation,
  reducer,
};
