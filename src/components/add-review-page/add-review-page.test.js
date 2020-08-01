import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {AddReviewPage} from "./add-review-page";
import {AuthorizationStatus} from "../../reducers/user/user";
import {Error} from "../../api";
import {NameSpace} from "../../reducers/name-space";
import {PageType} from "../../const";

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
  movie: mockPromoMovie,
  dataError: null,
  sendReview: () => {},
  setDataError: () => {},
  reviewRating: null,
  reviewText: null,
  onChange: () => {},
};


describe(`Render AddReviewPage`, () => {
  it(`AddReviewPage should match with snapshot when dataError is null`, () => {
    const addReviewPageSnapshot = renderer.create(
        <Provider store={store} >
          <AddReviewPage {...props} />
        </Provider>, nodeMock
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
        <Provider store={store} >
          <AddReviewPage {...props} />
        </Provider>, nodeMock
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
        <Provider store={store} >
          <AddReviewPage {...props} />
        </Provider>, nodeMock
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
        <Provider store={store} >
          <AddReviewPage {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(addReviewPageSnapshot).toMatchSnapshot();
  });
});
