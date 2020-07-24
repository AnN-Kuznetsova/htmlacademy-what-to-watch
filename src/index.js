import React from "react";
import ReactDom from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import {App} from "./components/app/app";
import {Operation as DataOperation} from "./reducer/data/data";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducer/user/user";
import {createAPI} from "./api.js";
import {reducer} from "./reducers/reducer";


const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(DataOperation.loadMovies());
store.dispatch(DataOperation.loadPromoMovie());
store.dispatch(UserOperation.checkAuth());


ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
