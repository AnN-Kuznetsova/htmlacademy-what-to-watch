import PropTypes from "prop-types";
import React from "react";


export const RatingItem = (props) => {
  const {
    id,
    onClick,
  } = props;

  const handleRatingChange = (event) => {
    event.target.checked = true;
    onClick();
  };

  return (
    <React.Fragment>
      <input
        className="rating__input"
        id={`star-${id}`}
        type="radio"
        name="rating"
        value={id}
        onChange={handleRatingChange} />
      <label className="rating__label" htmlFor={`star-${id}`}>Rating {id}</label>
    </React.Fragment>
  );
};


RatingItem.propTypes = {
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
