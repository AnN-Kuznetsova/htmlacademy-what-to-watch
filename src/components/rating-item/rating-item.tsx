import PropTypes from "prop-types";
import React from "react";


export const RatingItem = (props) => {
  const {
    id,
    onChange,
    rating,
  } = props;

  return (
    <React.Fragment>
      <input
        className="rating__input"
        id={`star-${id}`}
        type="radio"
        name="rating"
        value={id}
        checked={id === rating}
        onChange={onChange}
      />
      <label className="rating__label" htmlFor={`star-${id}`}>Rating {id}</label>
    </React.Fragment>
  );
};


RatingItem.propTypes = {
  id: PropTypes.number.isRequired,
  rating: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
