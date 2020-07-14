import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {AppComponent} from "./app.jsx";

import {promoMovie, movies} from "../../__test-data__/test-mocks.js";


const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const mockStore = configureStore([]);

const store = mockStore({
  movies,
  genre: `All genres`,
  movieList: movies,
});

const props = {
  activeMovie: promoMovie,
  onActiveMovieChange: () => {},
};


describe(`Render App`, () => {
  it(`Should match with snapshot`, () => {
    const appSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(appSnapshot).toMatchSnapshot();
  });
});
