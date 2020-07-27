import MockAdapter from "axios-mock-adapter";

import {ActionType as ApplicationActionType} from "../application/application";
import {PageType} from "../../const";
import {createAPI} from "../../api";
import {reducer, ActionType as DataActionType, ActionCreator, Operation} from "./data";

import {mockMovies, mockPromoMovie, mockRawFilm, mockRawFilmToMovie, mockReviews, mockRawReview} from "../../__test-data__/test-mocks";


describe(`Data reduser should work correctly`, () => {
  it(`Data reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      movies: [],
      promoMovie: {},
      maxMoviesCount: null,
      activeMovieReviews: [],
      dataError: null,
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


  it(`Data reducer should update reviews for active movie by load reviews`, () => {
    expect(reducer({
      activeMovieReviews: [],
    }, {
      type: DataActionType.LOAD_ACTIVE_MOVIE_REVIEWS,
      payload: mockReviews,
    })).toEqual({
      activeMovieReviews: mockReviews,
    });
  });


  it(`Data reducer should set dataError by a given value`, () => {
    expect(reducer({
      dataError: null,
    }, {
      type: DataActionType.SET_DATA_ERROR,
      payload: {status: 404},
    })).toEqual({
      dataError: {status: 404},
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


  it(`Data action creator for load active movie reviews returns correct action`, () => {
    expect(ActionCreator.loadActiveMovieReviews(mockReviews)).toEqual({
      type: DataActionType.LOAD_ACTIVE_MOVIE_REVIEWS,
      payload: mockReviews,
    });
  });


  it(`Data action creator for set dataError returns correct action`, () => {
    expect(ActionCreator.setDataError({status: 404})).toEqual({
      type: DataActionType.SET_DATA_ERROR,
      payload: {status: 404},
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


  /* it(`Should make a correct API call to /comments/: film_id`, () => {
    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = Operation.loadActiveMovieReviews();

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [mockRawReview]);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        //expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.LOAD_ACTIVE_MOVIE_REVIEWS,
          payload: [mockReviews],
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: DataActionType.SET_DATA_ERROR,
          payload: null,
        });
      });
  }); */
});
