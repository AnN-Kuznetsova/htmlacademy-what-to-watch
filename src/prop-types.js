import PropTypes from "prop-types";


export const MoviePropType = PropTypes.shape({
  title: PropTypes.string,
  smallPictureUrl: PropTypes.string,
  backgroundUrl: PropTypes.string,
  posterUrl: PropTypes.string,
  genre: PropTypes.string,
  releaseDate: PropTypes.instanceOf(Date),
  description: PropTypes.arrayOf(PropTypes.string),
  director: PropTypes.arrayOf(PropTypes.string),
  starring: PropTypes.arrayOf(PropTypes.string),
  runTime: PropTypes.string,
  reviews: PropTypes.array,
});
