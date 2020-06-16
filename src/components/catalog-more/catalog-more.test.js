import React from "react";
import renderer from "react-test-renderer";
import {CatalogMore} from "./catalog-more.jsx";


const props = {
  onClick: () => {},
};


describe(`Render CatalogMore`, () => {
  it(`Should match with snapshot`, () => {
    const catalogMoreSnapshot = renderer.create(
        <CatalogMore {...props} />
    ).toJSON();

    expect(catalogMoreSnapshot).toMatchSnapshot();
  });
});
