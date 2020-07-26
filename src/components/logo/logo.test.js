import React from "react";
import renderer from "react-test-renderer";

import {Logo, LogoMode} from "./logo";


describe(`Render Logo`, () => {
  it(`Logo should match with snapshot when logo mode is "NORMAL"`, () => {
    const logoSnapshot = renderer.create(
        <Logo mode={LogoMode.NORMAL} />
    ).toJSON();

    expect(logoSnapshot).toMatchSnapshot();
  });


  it(`Logo should match with snapshot when logo mode is "LIGHT"`, () => {
    const logoSnapshot = renderer.create(
        <Logo mode={LogoMode.LIGHT} />
    ).toJSON();

    expect(logoSnapshot).toMatchSnapshot();
  });
});
