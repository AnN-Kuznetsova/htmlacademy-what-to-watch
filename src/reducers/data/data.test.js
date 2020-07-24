import {reducer, ActionType, ActionCreator} from "./data";

import {mockMovies, mockPromoMovie} from "../../__test-data__/test-mocks";


describe(`Data reduser should work correctly`, () => {
  it(`Data reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      movies: [],
      promoMovie: {},
    });
  });


  it(`Data reducer should update movies by load movies`, () => {
    expect(reducer({
      movies: [],
    }, {
      type: ActionType.LOAD_MOVIES,
      payload: mockMovies,
    })).toEqual({
      movies: mockMovies,
    });
  });


  it(`Data reducer should update promo movie by load promo movie`, () => {
    expect(reducer({
      promoMovie: {},
    }, {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: mockPromoMovie,
    })).toEqual({
      promoMovie: mockPromoMovie,
    });
  });
});


describe(`Data action creators should work correctly`, () => {
  it(`Data action creator for load movies returns correct action`, () => {
    expect(ActionCreator.loadMovies(mockMovies)).toEqual({
      type: ActionType.LOAD_MOVIES,
      payload: mockMovies,
    });
  });


  it(`Data action creator for load promo movie returns correct action`, () => {
    expect(ActionCreator.loadPromoMovie(mockPromoMovie)).toEqual({
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: mockPromoMovie,
    });
  });
});
