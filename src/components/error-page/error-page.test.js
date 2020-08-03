import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {AuthorizationStatus} from "../../reducers/user/user";
import {ErrorPage} from "./error-page";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../const";


const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  },
  [NameSpace.APPLICATION]: {
    activePage: PageType.ERROR,
  },
});


describe(`Render ErrorPage`, () => {
  it(`ErrorPage should match with snapshot when dataError is null`, () => {
    const errorPageSnapshot = renderer.create(
        <Provider store={store} >
          <ErrorPage dataError={null} />
        </Provider>
    ).toJSON();

    expect(errorPageSnapshot).toMatchSnapshot();
  });


  it(`ErrorPage should match with snapshot when dataError is true`, () => {
    const errorPageSnapshot = renderer.create(
        <Provider store={store} >
          <ErrorPage dataError={{request: true}} />
        </Provider>
    ).toJSON();

    expect(errorPageSnapshot).toMatchSnapshot();
  });
});
