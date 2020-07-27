import {combineReducers} from "redux";

import {NameSpace} from "./name-space";
import {reducer as data} from "./data/data";
import {reducer as application} from "./application/application";
import {reducer as user} from "./user/user";


export const reducer = combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.APPLICATION]: application,
  [NameSpace.USER]: user,
});
