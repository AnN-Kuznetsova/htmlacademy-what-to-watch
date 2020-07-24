import MockAdapter from "axios-mock-adapter";

import {createAPI} from "../../api.js";
import {reducer, ActionType, ActionCreator, Operation} from "./data";

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


describe(`Data operation work correctly`, () => {
  it(`Should make a correct API call to /films`, () => {
    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: [{fake: true}],
        });
      });
  });


  it(`Should make a correct API call to /films/promo`, () => {
    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoMovieLoader = Operation.loadPromoMovie();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return promoMovieLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_MOVIE,
          payload: [{fake: true}],
        });
      });
  });
});
