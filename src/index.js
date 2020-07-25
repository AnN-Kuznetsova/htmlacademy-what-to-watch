import React from "react";
import ReactDom from "react-dom";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import {App} from "./components/app/app";
import {Operation as DataOperation} from "./reducers/data/data";
import {Operation as UserOperation, ActionCreator as UserActionCreator, AuthorizationStatus} from "./reducers/user/user";
import {createAPI} from "./api.js";
import {reducer} from "./reducers/reducer";


const onUnauthorized = () => {
  store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

const loadMovies = store.dispatch(DataOperation.loadMovies());
const loadPromoMovie = store.dispatch(DataOperation.loadPromoMovie());
store.dispatch(UserOperation.checkAuth());


if (loadMovies && loadPromoMovie) {
  ReactDom.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
}
