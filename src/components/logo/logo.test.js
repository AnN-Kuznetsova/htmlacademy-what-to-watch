import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import {LogoComponent, LogoMode} from "./logo";
import {history} from "../../history";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


describe(`Render Logo`, () => {
  it(`Logo should match with snapshot when logo mode is "NORMAL"`, () => {
    const props = {
      mode: LogoMode.NORMAL,
      promoMovie: mockPromoMovie,
      onClick: () => {},
    };

    const logoSnapshot = renderer.create(
        <Router history={history} >
          <LogoComponent {...props} />
        </Router>
    ).toJSON();

    expect(logoSnapshot).toMatchSnapshot();
  });


  it(`Logo should match with snapshot when logo mode is "LIGHT"`, () => {
    const props = {
      mode: LogoMode.LIGHT,
      promoMovie: mockPromoMovie,
      onClick: () => {},
    };

    const logoSnapshot = renderer.create(
        <Router history={history} >
          <LogoComponent {...props} />
        </Router>
    ).toJSON();

    expect(logoSnapshot).toMatchSnapshot();
  });
});
