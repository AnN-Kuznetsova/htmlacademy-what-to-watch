import React from "react";
import PropTypes from "prop-types";

import {Header} from "../header/header";
import {Footer} from "../footer/footer";


export const Error = {
  UNAUTHORIZED: 401,
};

const getErrorMessage = (isError) => {
  if (isError) {
    return `The request failed`;
  }

  return null;
};


export const ErrorPage = (props) => {
  const {isError} = props;

  return (
    <React.Fragment>
      <section
        className="movie-card"
        style={{backgroundColor: `#180202`}}
      >
        <Header />

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{getErrorMessage(isError)}</h2>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <Footer />
      </div>
    </React.Fragment>
  );
};


ErrorPage.propTypes = {
  isError: PropTypes.bool.isRequired,
};
