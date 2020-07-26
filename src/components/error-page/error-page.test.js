import React from "react";
import renderer from "react-test-renderer";

import {ErrorPage} from "./error-page";


describe(`Render ErrorPage`, () => {
  it(`ErrorPage should match with snapshot when dataError is false`, () => {
    const errorPageSnapshot = renderer.create(
        <ErrorPage dataError={false} />
    ).toJSON();

    expect(errorPageSnapshot).toMatchSnapshot();
  });


  it(`ErrorPage should match with snapshot when dataError is true`, () => {
    const errorPageSnapshot = renderer.create(
        <ErrorPage dataError={true} />
    ).toJSON();

    expect(errorPageSnapshot).toMatchSnapshot();
  });
});
