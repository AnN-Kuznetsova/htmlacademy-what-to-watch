import React from "react";
import renderer from "react-test-renderer";
import {GenresItem} from "./genres-item.jsx";
import {genreNames} from "../../__test-data__/test-mocks.js";
import {shallow} from "enzyme";


const props = {
  genreName: genreNames[6],
  onClick: () => {},
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
