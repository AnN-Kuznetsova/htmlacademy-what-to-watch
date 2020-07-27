import PropTypes from "prop-types";


const MoviePropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  smallPictureUrl: PropTypes.string.isRequired,
  backgroundUrl: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
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
  isFavorite: PropTypes.bool.isRequired,
});

const ReviewPropType = PropTypes.shape({
  text: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
});


export {
  MoviePropType,
  ReviewPropType,
};
