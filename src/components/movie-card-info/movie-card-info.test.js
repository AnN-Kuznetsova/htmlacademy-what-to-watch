import * as React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import {MovieCardInfo} from "./movie-card-info";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


const props = {
  movie: mockPromoMovie,
  renderTabNav: () =>{},
  renderTab: () =>{},
};

const movieCardInfoElement = shallow(<MovieCardInfo {...props} />);


describe(`Render MovieCardInfo`, () => {
  it(`Should match with snapshot`, () => {
    const movieCardInfoSnapshot = renderer.create(
        <MovieCardInfo {...props} />
    ).toJSON();

    expect(movieCardInfoSnapshot).toMatchSnapshot();
  });


  it(`Should render correct movie title`, () => {
    expect(movieCardInfoElement.find(`div.movie-card__poster img`).prop(`alt`))
      .toEqual(`${mockPromoMovie.title} poster`);
  });


  it(`Should render correct movie poster`, () => {
    expect(movieCardInfoElement.find(`div.movie-card__poster img`).prop(`src`))
      .toEqual(mockPromoMovie.posterUrl);
  });
});
