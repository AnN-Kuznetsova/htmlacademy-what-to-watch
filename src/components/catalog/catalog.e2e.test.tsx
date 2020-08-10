import * as React from "react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import {mount} from "enzyme";

import {CatalogComponent} from "./catalog.jsx";
import {NameSpace} from "../../reducers/name-space";
import {history} from "../../history";

import {mockMovies, mockPromoMovie} from "../../__test-data__/test-mocks.js";


const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.APPLICATION]: {
    activeMovie: mockPromoMovie,
    activePage: ``,
    prevPage: ``,
  },
});

let visibleCardCount = 1;

const onSmallMovieCardClick = jest.fn();
const onShowMoreButtonClick = jest.fn(() => {
  visibleCardCount += 8;
  catalogElement.setProps({visibleCardCount});
});

const props = {
  movies: mockMovies,
  visibleCardCount,
  onSmallMovieCardClick,
  onShowMoreButtonClick,
};

const catalogElement = mount(
    <Router history={history} >
      <Provider store={store}>
        <CatalogComponent {...props} />
      </Provider>
    </Router>
);


describe(`Catalog e2e-tests`, () => {
  it(`Clicking on the ShowMoreButton should increment visible small movie card count`, () => {
    catalogElement.find(`button.catalog__button`).simulate(`click`);

    expect(onShowMoreButtonClick).toHaveBeenCalledTimes(1);
    expect(catalogElement.props().visibleCardCount).toEqual(9);
  });
});
