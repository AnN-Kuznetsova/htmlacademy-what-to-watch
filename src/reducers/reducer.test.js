import {reducer, ActionType, ActionCreator} from "./reducer";

import {movies} from "../mocks/movies";
import {movies as mockMovies} from "../__test-data__/test-mocks";


describe(`Reduser should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      movies,
      genre: `All genres`,
      movieList: movies,
    });
  });


  it(`Reducer should change current genre by a given value`, () => {
    expect(reducer({
      movies: [],
      genre: `All genres`,
      movieList: [],
    }, {
      type: ActionType.CHANGE_GENRE,
      payload: `Drama`,
    })).toEqual({
      movies: [],
      genre: `Drama`,
      movieList: [],
    });

    expect(reducer({
      movies: [],
      genre: `Biography`,
      movieList: [],
    }, {
      type: ActionType.CHANGE_GENRE,
      payload: `All genres`,
    })).toEqual({
      movies: [],
      genre: `All genres`,
      movieList: [],
    });
  });


  it(`Reducer should get movies according to the current genre`, () => {
    expect(reducer({
      movies: mockMovies,
      genre: `All genres`,
      movieList: [],
    }, {
      type: ActionType.GET_MOVIES,
    })).toEqual({
      movies: mockMovies,
      genre: `All genres`,
      movieList: mockMovies,
    });

    expect(reducer({
      movies: mockMovies,
      genre: `Drama`,
      movieList: mockMovies,
    }, {
      type: ActionType.GET_MOVIES,
    })).toEqual({
      movies: mockMovies,
      genre: `Drama`,
      movieList: [mockMovies[0], mockMovies[1], mockMovies[2]],
    });

    expect(reducer({
      movies: mockMovies,
      genre: `Adventure`,
      movieList: [mockMovies[0], mockMovies[1]],
    }, {
      type: ActionType.GET_MOVIES,
    })).toEqual({
      movies: mockMovies,
      genre: `Adventure`,
      movieList: [mockMovies[2]],
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
});
