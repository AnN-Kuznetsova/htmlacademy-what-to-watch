import {NameSpace} from "../name-space.js";


const NAME_SPASE = NameSpace.USER;


export const getAuthorizationStatus = (state) => {
  return state[NAME_SPASE].authorizationStatus;
};
