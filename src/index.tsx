import * as React from "react";
import * as ReactDom from "react-dom";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createStore, applyMiddleware} from "redux";

import {App} from "./components/app/app";
import {Error} from "./api";
import {Operation as DataOperation, ActionCreator as DataActionCreator} from "./reducers/data/data";
import {Operation as UserOperation, ActionCreator as UserActionCreator, AuthorizationStatus} from "./reducers/user/user";
import {createAPI} from "./api";
import {getPromoMovie, getDataError} from "./reducers/data/selectors";
import {reducer} from "./reducers/reducer";


declare interface PromiseConstructor {
  allSettled(promises: Array<Promise<any>>): Promise<Array<{status: `fulfilled` | `rejected`; value?: any; reason?: any}>>;
}


const onFailRequest = (error) => {
  switch (true) {
    case error && error.status === Error.UNAUTHORIZED:
      store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
      break;

    default:
      if (!getDataError(store.getState())) {
        store.dispatch(DataActionCreator.setDataError(error));
      }
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


const moviesLoaded = store.dispatch(DataOperation.loadMovies());
const promoMoviesLoaded = store.dispatch(DataOperation.loadPromoMovie())
  .then(() => store.dispatch(DataOperation.loadActiveMovieReviews(getPromoMovie(store.getState()).id)));

store.dispatch(UserOperation.checkAuth());

declare const Promise: PromiseConstructor;
Promise.allSettled([moviesLoaded, promoMoviesLoaded])
      .then(() => {
        ReactDom.render(
            <Provider store={store}>
              <App />
            </Provider>,
            document.querySelector(`#root`)
        );
      });

