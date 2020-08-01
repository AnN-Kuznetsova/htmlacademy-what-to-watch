import React from "react";
import ReactDom from "react-dom";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import {App} from "./components/app/app";
import {Error} from "./api";
import {Operation as DataOperation, ActionCreator as DataActionCreator} from "./reducers/data/data";
import {Operation as UserOperation, ActionCreator as UserActionCreator, AuthorizationStatus} from "./reducers/user/user";
import {createAPI} from "./api";
import {reducer} from "./reducers/reducer";


const onFailRequest = (error) => {
  switch (true) {
    case error && error.status === Error.UNAUTHORIZED:
      store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
      break;

    default:
      store.dispatch(DataActionCreator.setDataError());
      break;
  }
};

const api = createAPI(onFailRequest);


const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
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
