import PropTypes from "prop-types";
import React from "react";


export const ShowMoreButton = (props) => {
  const {onClick} = props;

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={onClick}
      >
        Show more
      </button>
    </div>
  );
};


ShowMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
