import {NameSpace} from "../name-space.js";


const NAME_SPASE = NameSpace.USER;


const getAuthorizationStatus = (state) => {
  return state[NAME_SPASE].authorizationStatus;
};

const getLoginError = (state) => {
  return state[NAME_SPASE].loginError;
};


export {
  getAuthorizationStatus,
  getLoginError,
};
