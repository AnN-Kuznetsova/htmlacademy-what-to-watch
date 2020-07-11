import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header";


describe(`Render Header`, () => {
  it(`Should match with snapshot`, () => {
    let headerSnapshot = renderer.create(
        <Header isMainPageLink={true} />
    ).toJSON();
    expect(headerSnapshot).toMatchSnapshot();

    headerSnapshot = renderer.create(
        <Header isMainPageLink={false} />
    ).toJSON();
    expect(headerSnapshot).toMatchSnapshot();

    headerSnapshot = renderer.create(
        <Header />
    ).toJSON();
    expect(headerSnapshot).toMatchSnapshot();
  });
});
