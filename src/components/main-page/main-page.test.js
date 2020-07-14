import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {MainPage} from "./main-page.jsx";

import {promoMovie, movies} from "../../__test-data__/test-mocks.js";


global.window = Object.create(window);
Object.defineProperty(window, `location`, {
  value: {
    pathname: `/`
  }
});

const mockStore = configureStore([]);

const store = mockStore({
  movies,
  genre: `All genres`,
  movieList: movies,
});

const props = {
  promoMovie,
  openMovieDetailsPage: () => {},
};

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};


describe(`Render MainPage`, () => {
  it(`Should match with snapshot`, () => {
    const mainPageSnapshot = renderer.create(
        <Provider store={store}>
          <MainPage {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(mainPageSnapshot).toMatchSnapshot();
  });
});
