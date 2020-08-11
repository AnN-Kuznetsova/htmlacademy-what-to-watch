import * as React from "react";
import * as renderer from "react-test-renderer";

import {ListButtonComponent} from "./list-button";
import {noop} from "../../utils/utils";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


const props = {
  movie: mockPromoMovie,
  authorizationStatus: ``,
  changeMovie: noop,
};


describe(`Render ListButton`, () => {
  it(`ListButton should match with snapshot when it mode is "in-list"`, () => {
    props.movie.isFavorite = true;

    const listButtonSnapshot = renderer.create(
        <ListButtonComponent {...props} />
    ).toJSON();

    expect(listButtonSnapshot).toMatchSnapshot();
  });


  it(`ListButton should match with snapshot when it mode is "add"`, () => {
    props.movie.isFavorite = false;

    const listButtonSnapshot = renderer.create(
        <ListButtonComponent {...props} />
    ).toJSON();

    expect(listButtonSnapshot).toMatchSnapshot();
  });
});
