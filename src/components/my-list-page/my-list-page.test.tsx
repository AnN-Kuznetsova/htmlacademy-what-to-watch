import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import {AuthorizationStatus} from "../../reducers/user/user";
import {MyListPageComponent} from "./my-list-page";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../types";
import {history} from "../../history";
import {noop} from "../../utils/utils";

import {mockMovies} from "../../__test-data__/test-mocks";


const mockStore = configureStore([]);
const store = mockStore({
  [NameSpace.DATA]: {
    movies: mockMovies,
  },
  [NameSpace.APPLICATION]: {
    visibleMoviesCount: 8,
    activePage: PageType.MY_LIST,
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});


describe(`Render MyListPage`, () => {
  it(`MyListPage should match with snapshot`, () => {
    const props = {
      onOpenMyListPage: noop,
      dataError: null,
    };

    const myListPageSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <MyListPageComponent {...props} />
          </Provider>
        </Router>
    ).toJSON();

    expect(myListPageSnapshot).toMatchSnapshot();
  });


  it(`MyListPage should match with snapshot with error`, () => {
    const props = {
      onOpenMyListPage: noop,
      dataError: {status: 400},
    };

    const myListPageSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <MyListPageComponent {...props} />
          </Provider>
        </Router>
    ).toJSON();

    expect(myListPageSnapshot).toMatchSnapshot();
  });
});
