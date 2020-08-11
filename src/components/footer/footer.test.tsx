import * as React from "react";
import configureStore from "redux-mock-store";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import {Footer} from "./footer";
import {history} from "../../history";


global.window = Object.create(window);

const mockStore = configureStore([]);
const store = mockStore({});


describe(`Render Footer`, () => {
  it(`Should match with snapshot when window.location is MainPage`, () => {
    Object.defineProperty(window, `location`, {
      value: {
        pathname: `/`
      }
    });

    const footerSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <Footer />
          </Provider>
        </Router>
    ).toJSON();

    expect(footerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when window.location is not MainPage`, () => {
    window.location.pathname = `/page-name`;

    const footerSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <Footer />
          </Provider>
        </Router>
    ).toJSON();

    expect(footerSnapshot).toMatchSnapshot();
  });
});
