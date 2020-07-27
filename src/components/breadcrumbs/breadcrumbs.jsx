import PropTypes from "prop-types";
import React from "react";


export const Breadcrumbs = (props) => {
  const {} = props;

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <a href="movie-page.html" className="breadcrumbs__link">The Grand Budapest Hotel</a>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );
};


Breadcrumbs.propTypes = {

};
