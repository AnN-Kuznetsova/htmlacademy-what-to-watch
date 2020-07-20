import {reducer, ActionType, ActionCreator} from "./reducer";

import {PageType} from "../const";

import {movies} from "../mocks/movies";
import {promoMovie} from "../mocks/promo-movie";

import {mockMovies} from "../__test-data__/test-mocks";


describe(`Reduser should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      movies,
      genre: `All genres`,
      movieList: movies,
      visibleSmallCardCount: 8,
      activeMovie: promoMovie,
      activePage: PageType.MAIN,
    });
  });


  it(`Reducer should change current genre by a given value`, () => {
    expect(reducer({
      movies: [],
      genre: `All genres`,
      movieList: [],
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: ``,
    }, {
      type: ActionType.CHANGE_GENRE,
      payload: `Drama`,
    })).toEqual({
      movies: [],
      genre: `Drama`,
      movieList: [],
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: ``,
    });

    expect(reducer({
      movies: [],
      genre: `Biography`,
      movieList: [],
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: ``,
    }, {
      type: ActionType.CHANGE_GENRE,
      payload: `All genres`,
    })).toEqual({
      movies: [],
      genre: `All genres`,
      movieList: [],
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: ``,
    });
  });


  it(`Reducer should get movies according to the current genre`, () => {
    expect(reducer({
      movies: mockMovies,
      genre: `All genres`,
      movieList: [],
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: ``,
    }, {
      type: ActionType.GET_MOVIES,
    })).toEqual({
      movies: mockMovies,
      genre: `All genres`,
      movieList: mockMovies,
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: ``,
    });

    expect(reducer({
      movies: mockMovies,
      genre: `Drama`,
      movieList: mockMovies,
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: ``,
    }, {
      type: ActionType.GET_MOVIES,
    })).toEqual({
      movies: mockMovies,
      genre: `Drama`,
      movieList: [mockMovies[0], mockMovies[1], mockMovies[2]],
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: ``,
    });

    expect(reducer({
      movies: mockMovies,
      genre: `Adventure`,
      movieList: [mockMovies[0], mockMovies[1]],
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: ``,
    }, {
      type: ActionType.GET_MOVIES,
    })).toEqual({
      movies: mockMovies,
      genre: `Adventure`,
      movieList: [mockMovies[2]],
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: ``,
    });
  });


  it(`Reducer should change active movie by a given value`, () => {
    expect(reducer({
      movies: [],
      genre: `All genres`,
      movieList: [],
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: ``,
    }, {
      type: ActionType.CHANGE_ACTIVE_MOVIE,
      payload: mockMovies[1],
    })).toEqual({
      movies: [],
      genre: `All genres`,
      movieList: [],
      visibleSmallCardCount: 0,
      activeMovie: mockMovies[1],
      activePage: ``,
    });
  });


  it(`Reducer should change active page by a given value`, () => {
    expect(reducer({
      movies: [],
      genre: ``,
      movieList: [],
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: PageType.MAIN,
    }, {
      type: ActionType.CHANGE_ACTIVE_PAGE,
      payload: PageType.MOVIE_DETAILS,
    })).toEqual({
      movies: [],
      genre: ``,
      movieList: [],
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: PageType.MOVIE_DETAILS,
    });

    expect(reducer({
      movies: [],
      genre: ``,
      movieList: [],
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: PageType.MOVIE_DETAILS,
    }, {
      type: ActionType.CHANGE_ACTIVE_PAGE,
      payload: PageType.MAIN,
    })).toEqual({
      movies: [],
      genre: ``,
      movieList: [],
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: PageType.MAIN,
    });
  });


  it(`Reducer should increment visible small movie card count by a given value`, () => {
    expect(reducer({
      movies: [],
      genre: ``,
      movieList: [],
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: ``,
    }, {
      type: ActionType.INCREMENT_VISIBLE_SMALL_CARD_COUNT,
      payload: 2,
    })).toEqual({
      movies: [],
      genre: ``,
      movieList: [],
      visibleSmallCardCount: 2,
      activeMovie: {},
      activePage: ``,
    });

    expect(reducer({
      movies: [],
      genre: ``,
      movieList: [],
      visibleSmallCardCount: 2,
      activeMovie: {},
      activePage: ``,
    }, {
      type: ActionType.INCREMENT_VISIBLE_SMALL_CARD_COUNT,
      payload: 8,
    })).toEqual({
      movies: [],
      genre: ``,
      movieList: [],
      visibleSmallCardCount: 10,
      activeMovie: {},
      activePage: ``,
    });
  });


  it(`Reducer should reset visible small movie card count to the initial`, () => {
    expect(reducer({
      movies: [],
      genre: ``,
      movieList: [],
      visibleSmallCardCount: 0,
      activeMovie: {},
      activePage: ``,
    }, {
      type: ActionType.RESET_VISIBLE_SMALL_CARD_COUNT,
      payload: null,
    })).toEqual({
      movies: [],
      genre: ``,
      movieList: [],
      visibleSmallCardCount: 8,
      activeMovie: {},
      activePage: ``,
    });

    expect(reducer({
      movies: [],
      genre: ``,
      movieList: [],
      visibleSmallCardCount: 15,
      activeMovie: {},
      activePage: ``,
    }, {
      type: ActionType.RESET_VISIBLE_SMALL_CARD_COUNT,
      payload: null,
    })).toEqual({
      movies: [],
      genre: ``,
      movieList: [],
      visibleSmallCardCount: 8,
      activeMovie: {},
      activePage: ``,
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
    expect(ActionCreator.getMovies(3)).toEqual({
      type: ActionType.GET_MOVIES,
      payload: 3,
    });

    expect(ActionCreator.getMovies()).toEqual({
      type: ActionType.GET_MOVIES,
      payload: null,
    });
  });


  it(`Action creator for change active movie returns correct action`, () => {
    expect(ActionCreator.changeActiveMovie(mockMovies[1])).toEqual({
      type: ActionType.CHANGE_ACTIVE_MOVIE,
      payload: mockMovies[1],
    });
  });


  it(`Action creator for change active page returns correct action`, () => {
    expect(ActionCreator.changeActivePage(PageType.MOVIE_DETAILS)).toEqual({
      type: ActionType.CHANGE_ACTIVE_PAGE,
      payload: PageType.MOVIE_DETAILS,
    });
  });


  it(`Action creator for increment visible small card count returns correct action`, () => {
    expect(ActionCreator.incrementVisibleSmallCardCount()).toEqual({
      type: ActionType.INCREMENT_VISIBLE_SMALL_CARD_COUNT,
      payload: 8,
    });
  });


  it(`Action creator for reset visible small card count returns correct action`, () => {
    expect(ActionCreator.resetVisibleSmallCardCount()).toEqual({
      type: ActionType.RESET_VISIBLE_SMALL_CARD_COUNT,
      payload: null,
    });
  });
});
