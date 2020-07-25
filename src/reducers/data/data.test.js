import MockAdapter from "axios-mock-adapter";

import {ActionType as ApplicationActionType} from "../application/application";
import {PageType} from "../../const";
import {createAPI} from "../../api";
import {reducer, ActionType as DataActionType, ActionCreator, Operation} from "./data";

import {mockMovies, mockPromoMovie, mockRawFilm, mockRawFilmToMovie} from "../../__test-data__/test-mocks";


describe(`Data reduser should work correctly`, () => {
  it(`Data reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      movies: [],
      promoMovie: {},
      maxMoviesCount: null,
      isError: false,
    });
  });


  it(`Data reducer should update movies by load movies`, () => {
    expect(reducer({
      movies: [],
    }, {
      type: DataActionType.LOAD_MOVIES,
      payload: mockMovies,
    })).toEqual({
      movies: mockMovies,
    });
  });


  it(`Data reducer should update promo movie by load promo movie`, () => {
    expect(reducer({
      promoMovie: {},
    }, {
      type: DataActionType.LOAD_PROMO_MOVIE,
      payload: mockPromoMovie,
    })).toEqual({
      promoMovie: mockPromoMovie,
    });
  });


  it(`Data reducer should update max movies count by a given value`, () => {
    expect(reducer({
      maxMoviesCount: {},
    }, {
      type: DataActionType.SET_MAX_MOVIES_COUNT,
      payload: 8,
    })).toEqual({
      maxMoviesCount: 8,
    });
  });


  it(`Data reducer should set isError in true`, () => {
    expect(reducer({
      isError: false,
    }, {
      type: DataActionType.SET_ERROR,
      payload: true,
    })).toEqual({
      isError: true,
    });
  });
});


describe(`Data action creators should work correctly`, () => {
  it(`Data action creator for load movies returns correct action`, () => {
    expect(ActionCreator.loadMovies(mockMovies)).toEqual({
      type: DataActionType.LOAD_MOVIES,
      payload: mockMovies,
    });
  });


  it(`Data action creator for load promo movie returns correct action`, () => {
    expect(ActionCreator.loadPromoMovie(mockPromoMovie)).toEqual({
      type: DataActionType.LOAD_PROMO_MOVIE,
      payload: mockPromoMovie,
    });
  });


  it(`Data action creator for set max movies count returns correct action`, () => {
    expect(ActionCreator.setMaxMoviesCount(5)).toEqual({
      type: DataActionType.SET_MAX_MOVIES_COUNT,
      payload: 5,
    });
  });


  it(`Data action creator for set isError returns correct action`, () => {
    expect(ActionCreator.setError()).toEqual({
      type: DataActionType.SET_ERROR,
      payload: true,
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
      .reply(200, [mockRawFilm]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.LOAD_MOVIES,
          payload: [mockRawFilmToMovie],
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
      .reply(200, mockRawFilm);

    return promoMovieLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.LOAD_PROMO_MOVIE,
          payload: mockRawFilmToMovie,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ApplicationActionType.CHANGE_ACTIVE_MOVIE,
          payload: mockRawFilmToMovie,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ApplicationActionType.CHANGE_ACTIVE_PAGE,
          payload: PageType.MAIN,
        });
      });
  });
});
