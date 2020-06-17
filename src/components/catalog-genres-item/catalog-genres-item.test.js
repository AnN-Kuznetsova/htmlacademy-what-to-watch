import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import {CatalogGenresItem} from "./catalog-genres-item.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


const props = {
  genreName: `Kids & Family`,
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
