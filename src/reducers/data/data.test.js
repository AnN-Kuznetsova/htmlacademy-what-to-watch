import MockAdapter from "axios-mock-adapter";
import configureStore from "redux-mock-store";

import {ActionType as ApplicationActionType} from "../application/application";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../types";
import {createAPI} from "../../api";
import {reducer, ActionType as DataActionType, ActionCreator, Operation} from "./data";
import * as utils from "../../utils/utils";

import {
  mockMovies,
  mockPromoMovie,
  mockRawFilm,
  mockRawFilmToMovie,
  mockReviews,
  mockRawComment,
  mockRawCommentToReview
} from "../../__test-data__/test-mocks";


describe(`Data reduser should work correctly`, () => {
  it(`Data reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      movies: null,
      promoMovie: null,
      favoriteMovies: null,
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


  it(`Data reducer should update favoriteMovies by load favorite movies`, () => {
    expect(reducer({
      favoriteMovies: null,
    }, {
      type: DataActionType.LOAD_FAVORITE_MOVIES,
      payload: mockMovies,
    })).toEqual({
      favoriteMovies: mockMovies,
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


  it(`Data reducer should change movie in a movies by a given value`, () => {
    const testMovies = [{
      id: 1,
      isFavorite: false,
    }, {
      id: 2,
      isFavorite: false,
    }, {
      id: 3,
      isFavorite: false,
    }];

    let movie = {
      id: 2,
      isFavorite: true,
    };

    expect(reducer({
      movies: testMovies,
      promoMovie: testMovies[1],
    }, {
      type: DataActionType.CHANGE_MOVIE,
      payload: movie,
    })).toEqual({
      movies: [{
        id: 1,
        isFavorite: false,
      }, {
        id: 2,
        isFavorite: true,
      }, {
        id: 3,
        isFavorite: false,
      }],
      promoMovie: {
        id: 2,
        isFavorite: true,
      },
    });

    movie = {
      id: 1,
      isFavorite: true,
    };

    expect(reducer({
      movies: testMovies,
      promoMovie: testMovies[1],
    }, {
      type: DataActionType.CHANGE_MOVIE,
      payload: movie,
    })).toEqual({
      movies: [{
        id: 1,
        isFavorite: true,
      }, {
        id: 2,
        isFavorite: false,
      }, {
        id: 3,
        isFavorite: false,
      }],
      promoMovie: {
        id: 2,
        isFavorite: false,
      },
    });

    movie = {
      id: 4,
      isFavorite: true,
    };

    expect(reducer({
      movies: testMovies,
      promoMovie: testMovies[1],
    }, {
      type: DataActionType.CHANGE_MOVIE,
      payload: movie,
    })).toEqual({
      movies: [{
        id: 1,
        isFavorite: false,
      }, {
        id: 2,
        isFavorite: false,
      }, {
        id: 3,
        isFavorite: false,
      }],
      promoMovie: {
        id: 2,
        isFavorite: false,
      },
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


  it(`Data action creator for load favorite movies returns correct action`, () => {
    expect(ActionCreator.loadFavoriteMovies(mockMovies)).toEqual({
      type: DataActionType.LOAD_FAVORITE_MOVIES,
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


  it(`Data action creator for change movie returns correct action`, () => {
    expect(ActionCreator.changeMovie(mockPromoMovie)).toEqual({
      type: DataActionType.CHANGE_MOVIE,
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


  it(`Should make a correct API call for fail get request to /films`, () => {
    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    apiMock
      .onGet(`/films`)
      .reply(400);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.SET_DATA_ERROR,
          payload: new Error(`Request failed with status code 400`),
        });
      });
  });


  it(`Should make a correct API call to /favorite`, () => {
    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteMoviesLoader = Operation.loadFavoriteMovies();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [mockRawFilm]);

    return favoriteMoviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.LOAD_FAVORITE_MOVIES,
          payload: [mockRawFilmToMovie],
        });
      });
  });


  it(`Should make a correct API call for fail get request to /favorite`, () => {
    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteMoviesLoader = Operation.loadFavoriteMovies();

    apiMock
      .onGet(`/favorite`)
      .reply(400);

    return favoriteMoviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.SET_DATA_ERROR,
          payload: new Error(`Request failed with status code 400`),
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


  it(`Should make a correct API call for fail get request to /films/promo`, () => {
    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoMovieLoader = Operation.loadPromoMovie();

    apiMock
      .onGet(`/films/promo`)
      .reply(400);

    return promoMovieLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.SET_DATA_ERROR,
          payload: new Error(`Request failed with status code 400`),
        });
      });
  });


  it(`Should make a correct API call for get request to /comments/: film_id`, () => {
    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const reviewsLoader = Operation.loadActiveMovieReviews(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [mockRawComment]);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.LOAD_ACTIVE_MOVIE_REVIEWS,
          payload: [mockRawCommentToReview],
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: DataActionType.SET_DATA_ERROR,
          payload: null,
        });
      });
  });


  it(`Should make a correct API call for post request to /comments/: film_id`, () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      [NameSpace.APPLICATION]: {
        activeMovie: mockPromoMovie,
      },
    });

    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const reviewData = {
      movieId: 1,
      rating: 4,
      comment: mockRawCommentToReview.text,
      addReviewFormElements: [],
    };
    const reviewSender = Operation.sendReview(reviewData);

    apiMock
      .onPost(`/comments/1`, {
        rating: reviewData.rating,
        comment: reviewData.comment,
      })
      .reply(200, [mockRawComment]);

    return reviewSender(dispatch, store.getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ApplicationActionType.CHANGE_ACTIVE_PAGE,
          payload: PageType.MOVIE_DETAILS,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: DataActionType.LOAD_ACTIVE_MOVIE_REVIEWS,
          payload: [mockRawCommentToReview],
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: DataActionType.SET_DATA_ERROR,
          payload: null,
        });
      });
  });


  it(`Should make a correct API call for fail post request to /comments/: film_id`, () => {
    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const reviewData = {
      movieId: 1,
      rating: 4,
      comment: mockRawCommentToReview.text,
      addReviewFormElements: [],
    };
    const reviewSender = Operation.sendReview(reviewData);

    apiMock
      .onPost(`/comments/1`, {
        rating: reviewData.rating,
        comment: reviewData.comment,
      })
      .reply(400);

    return reviewSender(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.SET_DATA_ERROR,
          payload: new Error(`Request failed with status code 400`),
        });
      });
  });


  it(`Should make a correct API call to /favorite/:id/:status`, () => {
    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const newMovieData = {
      id: 1,
      status: 0,
    };
    const changeMovieDataSender = Operation.changeMovie(newMovieData, []);

    apiMock
      .onPost(`/favorite/1/0`)
      .reply(200, mockRawFilm);

    return changeMovieDataSender(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.CHANGE_MOVIE,
          payload: mockRawFilmToMovie,
        });
      });
  });


  it(`Should make a correct API call fail post request to /favorite/:id/:status`, () => {
    jest.useFakeTimers();
    utils.setErrorStyle = jest.fn();

    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const newMovieData = {
      id: 1,
      status: 0,
    };
    const formElements = [];
    const changeMovieDataSender = Operation.changeMovie(newMovieData, formElements);

    apiMock
      .onPost(`/favorite/1/0`)
      .reply(400);

    return changeMovieDataSender(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(0);

        expect(utils.setErrorStyle).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledTimes(1);
        jest.runTimersToTime(500);
        expect(utils.setErrorStyle).toHaveBeenCalledTimes(2);
        expect(utils.setErrorStyle).toHaveBeenNthCalledWith(1, formElements);
        expect(utils.setErrorStyle).toHaveBeenNthCalledWith(2, formElements, false);
      });
  });
});
