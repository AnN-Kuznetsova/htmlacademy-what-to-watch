
import * as React from "react";


interface Props {
  id: number;
  rating?: number;
  onChange: () => void;
}


export const RatingItem: React.FunctionComponent<Props> = (props: Props) => {
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
