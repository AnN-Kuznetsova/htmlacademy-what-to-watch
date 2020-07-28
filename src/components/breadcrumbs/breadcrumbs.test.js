import React from "react";
import renderer from "react-test-renderer";

import {Breadcrumbs} from "./breadcrumbs";


const breadcrambsList = [
  {
    link: `#`,
    onLinkClick: () => {},
    title: `title`,
  },
  {
    title: `Add review`,
  }
];


describe(`Render Breadcrambs`, () => {
  it(`Breadcrambs should match with snapshot`, () => {
    const breadcrambsSnapshot = renderer.create(
        <Breadcrumbs breadcrambsList={breadcrambsList} />,
    ).toJSON();

    expect(breadcrambsSnapshot).toMatchSnapshot();
  });
});
