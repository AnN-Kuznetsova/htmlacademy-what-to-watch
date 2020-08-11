import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import {CatalogComponent} from "./catalog";
import {NameSpace} from "../../reducers/name-space";
import {history} from "../../history";
import {noop} from "../../utils/utils";

import {mockMovies, mockPromoMovie} from "../../__test-data__/test-mocks";


const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.APPLICATION]: {
    activeMovie: mockPromoMovie,
    activePage: ``,
    prevPage: ``,
  },
});

const props = {
  movies: [],
  visibleCardCount: 8,
  onSmallMovieCardClick: noop,
  onShowMoreButtonClick: noop,
};

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};


describe(`Render Catalog`, () => {
  it(`Catalog should match with snapshot with ShowMoreButton`, () => {
    props.movies = [].concat(mockMovies, mockMovies, mockMovies);

    const catalogSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store}>
            <CatalogComponent {...props} />
          </Provider>
        </Router>, nodeMock
    ).toJSON();

    expect(catalogSnapshot).toMatchSnapshot();
  });


  it(`Catalog should match with snapshot without ShowMoreButton`, () => {
    props.movies = mockMovies;

    const catalogSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store}>
            <CatalogComponent {...props} />
          </Provider>
        </Router>, nodeMock
    ).toJSON();

    expect(catalogSnapshot).toMatchSnapshot();
  });
});
