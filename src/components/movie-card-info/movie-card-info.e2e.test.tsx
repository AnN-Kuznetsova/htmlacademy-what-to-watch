import * as React from "react";
import {shallow} from "enzyme";

import {MovieCardInfo} from "./movie-card-info";
import {MovieDetails} from "../movie-details/movie-details";
import {MovieOverview} from "../movie-overview/movie-overview";
import {MovieReviews} from "../movie-reviews/movie-reviews";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


const renderTabNav = jest.fn();
const renderTab = jest.fn();

const props = {
  movie: mockPromoMovie,
  renderTabNav,
  renderTab,
};

shallow(<MovieCardInfo {...props} />);


describe(`MovieCardInfo e2e-tests`, () => {
  it(`"renderTabNav" should be called with correct data`, () => {
    expect(renderTabNav).toHaveBeenCalledTimes(1);
    expect(renderTabNav.mock.calls[0][0]).toEqual([`Overview`, `Details`, `Reviews`]);
  });


  it(`"renderTab" should be called with correct data`, () => {
    expect(renderTab).toHaveBeenCalledTimes(3);
    expect(renderTab.mock.calls[0]).toEqual([0, MovieOverview, {movie: mockPromoMovie}, `Overview0`]);
    expect(renderTab.mock.calls[1]).toEqual([1, MovieDetails, {movie: mockPromoMovie}, `Details1`]);
    expect(renderTab.mock.calls[2]).toEqual([2, MovieReviews, {movie: mockPromoMovie}, `Reviews2`]);
  });
});
