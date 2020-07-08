import PropTypes from "prop-types";


export const MoviePropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  smallPictureUrl: PropTypes.string.isRequired,
  backgroundUrl: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  releaseDate: PropTypes.instanceOf(Date).isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  directors: PropTypes.arrayOf(PropTypes.string).isRequired,
  starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  runTime: PropTypes.number.isRequired,
  reviews: PropTypes.array.isRequired,
  rating: PropTypes.shape({
    score: PropTypes.number.isRequired,
    totalVotes: PropTypes.number.isRequired,
  }).isRequired,
});
