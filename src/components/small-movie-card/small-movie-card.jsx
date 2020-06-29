import PropTypes from "prop-types";
import React from "react";
import {MoviePropType} from "../../prop-types.js";
import {VideoPlayer} from "../video-player/video-player.jsx";

const src = `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`;

export const SmallMovieCard = (props) => {
  const {movie, onClick, onHover} = props;
  const {title, smallPictureUrl} = movie;

  const handleCardClick = (event) => {
    event.preventDefault();
    onClick();
  };

  const handleCardHover = () => {
    onHover(movie);
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={handleCardHover}
      onClick={handleCardClick}
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          src={src}
          posterUrl={smallPictureUrl}
          isFullScreen={false}
          isPlaying={false}
          isSound={false}
          videoHeight={175}
        />

        <img
          src={smallPictureUrl}
          alt={title}
          width="280"
          height="175"
        />
      </div>

      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};


SmallMovieCard.propTypes = {
  movie: MoviePropType.isRequired,
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
};
