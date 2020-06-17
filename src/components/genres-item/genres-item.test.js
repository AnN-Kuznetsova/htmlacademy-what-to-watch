import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import {GenresItem} from "./genres-item.jsx";
import {genreName} from "../../__test-data__/test-mocks.js";


const props = {
  genreName,
  onGenreClick: () => {},
};

const genresItemElement = shallow(<GenresItem {...props} />);


describe(`Render GenresItem`, () => {
  it(`Should match with snapshot`, () => {
    const genresItemSnapshot = renderer.create(
        <GenresItem {...props} />
    ).toJSON();

    expect(genresItemSnapshot).toMatchSnapshot();
  });

  it(`Should render correct movie genre`, () => {
    expect(genresItemElement.find(`a.catalog__genres-link`).text())
      .toEqual(props.genreName);
  });
});
