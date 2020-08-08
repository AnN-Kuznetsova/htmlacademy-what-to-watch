import {reducer, ActionType, ActionCreator} from "./application";

import {PageType} from "../../const";

import {mockMovies} from "../../__test-data__/test-mocks";


describe(`Application reduser should work correctly`, () => {
  it(`Application reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      genre: `All genres`,
      activeMovie: null,
      visibleMoviesCount: 8,
      activePage: PageType.ERROR,
      prevPage: PageType.ERROR,
    });
  });


  it(`Application reducer should change current genre by a given value`, () => {
    expect(reducer({
      genre: `All genres`,
    }, {
      type: ActionType.CHANGE_GENRE,
      payload: `Drama`,
    })).toEqual({
      genre: `Drama`,
    });

    expect(reducer({
      genre: `Biography`,
    }, {
      type: ActionType.CHANGE_GENRE,
      payload: `All genres`,
    })).toEqual({
      genre: `All genres`,
    });
  });


  it(`Application reducer should change active movie by a given value`, () => {
    expect(reducer({
      activeMovie: null,
    }, {
      type: ActionType.CHANGE_ACTIVE_MOVIE,
      payload: mockMovies[1],
    })).toEqual({
      activeMovie: mockMovies[1],
    });

    expect(reducer({
      activeMovie: {},
    }, {
      type: ActionType.CHANGE_ACTIVE_MOVIE,
      payload: mockMovies[1],
    })).toEqual({
      activeMovie: mockMovies[1],
    });
  });


  it(`Application reducer should change active and prev pages by a given value`, () => {
    expect(reducer({
      activePage: PageType.MAIN,
      prevPage: PageType.MAIN,
    }, {
      type: ActionType.CHANGE_ACTIVE_PAGE,
      payload: PageType.MOVIE_DETAILS,
    })).toEqual({
      activePage: PageType.MOVIE_DETAILS,
      prevPage: PageType.MAIN,
    });

    expect(reducer({
      activePage: PageType.MOVIE_DETAILS,
      prevPage: PageType.MAIN,
    }, {
      type: ActionType.CHANGE_ACTIVE_PAGE,
      payload: PageType.MAIN,
    })).toEqual({
      activePage: PageType.MAIN,
      prevPage: PageType.MOVIE_DETAILS,
    });

    expect(reducer({
      activePage: PageType.MOVIE_DETAILS,
      prevPage: PageType.MAIN,
    }, {
      type: ActionType.CHANGE_ACTIVE_PAGE,
      payload: PageType.MOVIE_DETAILS,
    })).toEqual({
      activePage: PageType.MOVIE_DETAILS,
      prevPage: PageType.MAIN,
    });
  });


  it(`Application reducer should increment visible small movie card count by a given value`, () => {
    expect(reducer({
      visibleMoviesCount: 0,
    }, {
      type: ActionType.INCREMENT_VISIBLE_MOVIES_COUNT,
      payload: 2,
    })).toEqual({
      visibleMoviesCount: 2,
    });

    expect(reducer({
      visibleMoviesCount: 2,
    }, {
      type: ActionType.INCREMENT_VISIBLE_MOVIES_COUNT,
      payload: 8,
    })).toEqual({
      visibleMoviesCount: 10,
    });
  });


  it(`Application reducer should reset visible small movie card count to the initial`, () => {
    expect(reducer({
      visibleMoviesCount: 0,
    }, {
      type: ActionType.RESET_VISIBLE_MOVIES_COUNT,
      payload: null,
    })).toEqual({
      visibleMoviesCount: 8,
    });

    expect(reducer({
      visibleMoviesCount: 15,
    }, {
      type: ActionType.RESET_VISIBLE_MOVIES_COUNT,
      payload: null,
    })).toEqual({
      visibleMoviesCount: 8,
    });
  });
});


describe(`Application action creators should work correctly`, () => {
  it(`Application action creator for change genre returns correct action`, () => {
    expect(ActionCreator.changeGenre(`All genres`)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: `All genres`,
    });
  });


  it(`Application action creator for change active movie returns correct action`, () => {
    expect(ActionCreator.changeActiveMovie(mockMovies[1])).toEqual({
      type: ActionType.CHANGE_ACTIVE_MOVIE,
      payload: mockMovies[1],
    });
  });


  it(`Application action creator for change active page returns correct action`, () => {
    expect(ActionCreator.changeActivePage(PageType.MOVIE_DETAILS)).toEqual({
      type: ActionType.CHANGE_ACTIVE_PAGE,
      payload: PageType.MOVIE_DETAILS,
    });
  });


  it(`Application action creator for increment visible small card count returns correct action`, () => {
    expect(ActionCreator.incrementVisibleMoviesCount()).toEqual({
      type: ActionType.INCREMENT_VISIBLE_MOVIES_COUNT,
      payload: 8,
    });
  });


  it(`Application action creator for reset visible small card count returns correct action`, () => {
    expect(ActionCreator.resetVisibleMoviesCount()).toEqual({
      type: ActionType.RESET_VISIBLE_MOVIES_COUNT,
      payload: null,
    });
  });
});
