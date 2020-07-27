import React from "react";
import renderer from "react-test-renderer";

import {ErrorPage} from "./error-page";


describe(`Render ErrorPage`, () => {
  it(`ErrorPage should match with snapshot when isError is false`, () => {
    const errorPageSnapshot = renderer.create(
        <ErrorPage isError={false} />
    ).toJSON();

    expect(errorPageSnapshot).toMatchSnapshot();
  });


  it(`ErrorPage should match with snapshot when isError is true`, () => {
    const errorPageSnapshot = renderer.create(
        <ErrorPage isError={true} />
    ).toJSON();

    expect(errorPageSnapshot).toMatchSnapshot();
  });
});
