import PropTypes from "prop-types";
import React from "react";
import {DELAY_PLAYBACK_PREVIEW} from "../../const.js";
import {MoviePropType} from "../../prop-types.js";
import {VideoPlayerMode} from "../video-player/video-player.jsx";
import {VideoPlayerStatus} from "../../hocs/with-video-player/with-video-player.jsx";


export const SmallMovieCard = (props) => {
  const {movie, onClick, onHover, renderVideoPlayer, setVideoPlayerStatus} = props;
  const {title, smallPictureUrl, previewUrl} = movie;
  let timer = null;

  const _cancelCardHover = () => {
    if (timer) {
      clearTimeout(timer);
    }

    if (VideoPlayerStatus.ON_PLAY) {
      setVideoPlayerStatus(VideoPlayerStatus.ON_PAUSE);
    }
  };

  const _handleCardClick = (event) => {
    event.preventDefault();
    _cancelCardHover();
    onClick();
  };

  const _handleCardHover = () => {
    onHover(movie);
    timer = setTimeout(
        setVideoPlayerStatus.bind(null, VideoPlayerStatus.ON_PLAY),
        DELAY_PLAYBACK_PREVIEW
    );
  };

  const _handleCardLeave = () => {
    _cancelCardHover();
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={_handleCardHover}
      onMouseLeave={_handleCardLeave}
      onClick={_handleCardClick}
    >
      <div className="small-movie-card__image">
        {renderVideoPlayer(previewUrl, smallPictureUrl, VideoPlayerMode.PREVIEW)}

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
  renderVideoPlayer: PropTypes.func.isRequired,
  setVideoPlayerStatus: PropTypes.func.isRequired,
};
