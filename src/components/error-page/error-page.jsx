import React from "react";
import PropTypes from "prop-types";

import {Header} from "../header/header";
import {Footer} from "../footer/footer";


const getErrorMessage = (dataError) => {
  if (dataError) {
    return `The request failed`;
  }

  return null;
};


export const ErrorPage = (props) => {
  const {dataError} = props;

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
              <h2 className="movie-card__title">{getErrorMessage(dataError)}</h2>
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
  dataError: PropTypes.bool.isRequired,
};
