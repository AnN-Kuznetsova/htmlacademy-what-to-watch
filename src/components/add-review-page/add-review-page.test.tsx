import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import {AddReviewPageComponent} from "./add-review-page";
import {AuthorizationStatus} from "../../reducers/user/user";
import {Error} from "../../api";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../types";
import {history} from "../../history";
import {noop} from "../../utils/utils";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.APPLICATION]: {
    activeMovie: mockPromoMovie,
    activePage: PageType.ADD_REVIEW,
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const props = {
  routeProps: {
    match: {
      params: 1}
  },
  movie: mockPromoMovie,
  dataError: null,
  sendReview: noop,
  setDataError: noop,
  openAddReviewPage: noop,
  reviewRating: null,
  reviewText: null,
  onChange: noop,
  onError: noop,
};


describe(`Render AddReviewPage`, () => {
  it(`AddReviewPage should match with snapshot when dataError is null`, () => {
    const addReviewPageSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <AddReviewPageComponent {...props} />
          </Provider>
        </Router>, nodeMock
    ).toJSON();

    expect(addReviewPageSnapshot).toMatchSnapshot();
  });


  it(`AddReviewPage should match with snapshot when dataError is "BAD_REQUEST"`, () => {
    props.dataError = {
      response: {
        status: 400,
      }
    };

    const addReviewPageSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <AddReviewPageComponent {...props} />
          </Provider>
        </Router>, nodeMock
    ).toJSON();

    expect(addReviewPageSnapshot).toMatchSnapshot();
  });


  it(`AddReviewPage should match with snapshot when dataError is "UNAUTHORIZED"`, () => {
    props.dataError = {
      response: {
        status: 401,
      }
    };

    const addReviewPageSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <AddReviewPageComponent {...props} />
          </Provider>
        </Router>, nodeMock
    ).toJSON();

    expect(addReviewPageSnapshot).toMatchSnapshot();
  });


  it(`AddReviewPage should match with snapshot when dataError is "VALIDATION"`, () => {
    props.dataError = {
      response: Error.VALIDATION,
      data: {
        reviewTextValueError: true,
        ratingValueError: true,
      }
    };

    const addReviewPageSnapshot = renderer.create(
        <Router history={history} >
          <Provider store={store} >
            <AddReviewPageComponent {...props} />
          </Provider>
        </Router>, nodeMock
    ).toJSON();

    expect(addReviewPageSnapshot).toMatchSnapshot();
  });
});
