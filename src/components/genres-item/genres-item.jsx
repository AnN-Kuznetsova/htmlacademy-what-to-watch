import PropTypes from "prop-types";
import React from "react";


export const GenresItem = (props) => {
  const {genreName, onClick} = props;

  return (
    <li className="catalog__genres-item">
      <a
        href="#"
        className="catalog__genres-link"
        onClick={onClick}
      >{genreName}</a>
    </li>
  );
};


GenresItem.propTypes = {
  genreName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
