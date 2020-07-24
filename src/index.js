import React from "react";
import ReactDom from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import {App} from "./components/app/app";
import {ActionCreator as ApplicationActionCreator} from "./reducers/application/application";
import {Operation as DataOperation} from "./reducers/data/data";
import {Operation as UserOperation, ActionCreator as UserActionCreator, AuthorizationStatus} from "./reducers/user/user";
import {createAPI} from "./api.js";
import {getPromoMovie} from "./reducers/data/selectors";
import {reducer} from "./reducers/reducer";


const onUnauthorized = () => {
  store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(DataOperation.loadMovies());
store.dispatch(DataOperation.loadPromoMovie());
store.dispatch(UserOperation.checkAuth());

store.dispatch(ApplicationActionCreator.changeActiveMovie(
    getPromoMovie(store)
));


ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
