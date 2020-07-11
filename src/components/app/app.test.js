import React from "react";
import renderer from "react-test-renderer";

import {App} from "./app.jsx";


const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};


describe(`Render App`, () => {
  it(`Should match with snapshot`, () => {
    const appSnapshot = renderer.create(
        <App />, nodeMock
    ).toJSON();

    expect(appSnapshot).toMatchSnapshot();
  });
});
