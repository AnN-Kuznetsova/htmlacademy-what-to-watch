import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import {CatalogGenresItem} from "./catalog-genres-item.jsx";
import {genreName} from "../../__test-data__/test-mocks.js";


const props = {
  genreName,
  onGenreClick: () => {},
};

const catalogGenresItemElement = shallow(<CatalogGenresItem {...props} />);


describe(`Render CatalogGenresItem`, () => {
  it(`Should match with snapshot`, () => {
    const catalogGenresItemSnapshot = renderer.create(
        <CatalogGenresItem {...props} />
    ).toJSON();

    expect(catalogGenresItemSnapshot).toMatchSnapshot();
  });

  it(`Should render correct movie genre`, () => {
    expect(catalogGenresItemElement.find(`a.catalog__genres-link`).text())
      .toEqual(props.genreName);
  });
});
