import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import {Breadcrumbs} from "./breadcrumbs";
import {history} from "../../history";


const breadcrambsList = [
  {
    title: `title`,
    link: `/films/1`,
    onLinkClick: () => {},
  },
  {
    title: `Add review`,
    link: ``,
  }
];


describe(`Render Breadcrambs`, () => {
  it(`Breadcrambs should match with snapshot`, () => {
    const breadcrambsSnapshot = renderer.create(
        <Router history={history} >
          <Breadcrumbs breadcrambsList={breadcrambsList} />
        </Router>
    ).toJSON();

    expect(breadcrambsSnapshot).toMatchSnapshot();
  });
});
