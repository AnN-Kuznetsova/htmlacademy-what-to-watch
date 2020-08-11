import * as React from "react";

import {Error} from "../../api";
import {Footer} from "../footer/footer";
import {Header} from "../header/header";


interface Props {
  dataError?: object;
}


const getErrorMessage = (dataError) => {
  if (dataError) {
    switch (true) {
      case dataError.status === Error.PAGE_NOT_FOUND:
        return `Page not found.`;

      default:
        return `The request failed`;
    }
  }

  return null;
};


const ErrorPage: React.FunctionComponent<Props> = (props: Props) => {
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


export {
  ErrorPage,
};
