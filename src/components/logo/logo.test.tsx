import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import {LogoComponent, LogoMode} from "./logo";
import {history} from "../../history";
import {noop} from "../../utils/utils";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


global.window = Object.create(window);


describe(`Render Logo`, () => {
  it(`Logo should match with snapshot when logo mode is "NORMAL" and page is MAIN`, () => {
    Object.defineProperty(window, `location`, {
      value: {
        pathname: `/`,
      }
    });

    const props = {
      mode: LogoMode.NORMAL,
      promoMovie: mockPromoMovie,
      onClick: noop,
    };

    const logoSnapshot = renderer.create(
        <Router history={history} >
          <LogoComponent {...props} />
        </Router>
    ).toJSON();

    expect(logoSnapshot).toMatchSnapshot();
  });


  it(`Logo should match with snapshot when logo mode is "LIGHT" and page is not MAIN`, () => {
    window.location.pathname = `/page-name`;

    const props = {
      mode: LogoMode.LIGHT,
      promoMovie: mockPromoMovie,
      onClick: noop,
    };

    const logoSnapshot = renderer.create(
        <Router history={history} >
          <LogoComponent {...props} />
        </Router>
    ).toJSON();

    expect(logoSnapshot).toMatchSnapshot();
  });
});
