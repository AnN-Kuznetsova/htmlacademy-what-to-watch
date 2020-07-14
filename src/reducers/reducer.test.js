import {reducer, ActionType, ActionCreator} from "./reducer";

import {movies} from "../mocks/movies";
import {promoMovie} from "../mocks/promo-movie";

import {movies as mockMovies} from "../__test-data__/test-mocks";


describe(`Reduser should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      movies,
      genre: `All genres`,
      movieList: movies,
      activeMovie: promoMovie,
    });
  });


  it(`Reducer should change current genre by a given value`, () => {
    expect(reducer({
      movies: [],
      genre: `All genres`,
      movieList: [],
      activeMovie: {},
    }, {
      type: ActionType.CHANGE_GENRE,
      payload: `Drama`,
    })).toEqual({
      movies: [],
      genre: `Drama`,
      movieList: [],
      activeMovie: {},
    });

    expect(reducer({
      movies: [],
      genre: `Biography`,
      movieList: [],
      activeMovie: {},
    }, {
      type: ActionType.CHANGE_GENRE,
      payload: `All genres`,
    })).toEqual({
      movies: [],
      genre: `All genres`,
      movieList: [],
      activeMovie: {},
    });
  });


  it(`Reducer should get movies according to the current genre`, () => {
    expect(reducer({
      movies: mockMovies,
      genre: `All genres`,
      movieList: [],
      activeMovie: {},
    }, {
      type: ActionType.GET_MOVIES,
    })).toEqual({
      movies: mockMovies,
      genre: `All genres`,
      movieList: mockMovies,
      activeMovie: {},
    });

    expect(reducer({
      movies: mockMovies,
      genre: `Drama`,
      movieList: mockMovies,
      activeMovie: {},
    }, {
      type: ActionType.GET_MOVIES,
    })).toEqual({
      movies: mockMovies,
      genre: `Drama`,
      movieList: [mockMovies[0], mockMovies[1], mockMovies[2]],
      activeMovie: {},
    });

    expect(reducer({
      movies: mockMovies,
      genre: `Adventure`,
      movieList: [mockMovies[0], mockMovies[1]],
      activeMovie: {},
    }, {
      type: ActionType.GET_MOVIES,
    })).toEqual({
      movies: mockMovies,
      genre: `Adventure`,
      movieList: [mockMovies[2]],
      activeMovie: {},
    });
  });


  it(`Reducer should change active movie by a given value`, () => {
    expect(reducer({
      movies: [],
      genre: `All genres`,
      movieList: [],
      activeMovie: {},
    }, {
      type: ActionType.CHANGE_ACTIVE_MOVIE,
      payload: mockMovies[1],
    })).toEqual({
      movies: [],
      genre: `All genres`,
      movieList: [],
      activeMovie: mockMovies[1],
    });
  });
});


describe(`Action creators should work correctly`, () => {
  it(`Action creator for change genre returns correct action`, () => {
    expect(ActionCreator.changeGenre(`All genres`)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: `All genres`,
    });
  });


  it(`Action creator for get movies returns correct action`, () => {
    expect(ActionCreator.getMovies()).toEqual({
      type: ActionType.GET_MOVIES,
      payload: null,
    });
  });


  it(`Action creator for change active movie returns correct action`, () => {
    expect(ActionCreator.getMovies(mockMovies[1])).toEqual({
      type: ActionType.CHANGE_ACTIVE_MOVIE,
      payload: mockMovies[1],
    });
  });
});
