import PropTypes from "prop-types";
import React from "react";
import {DELAY_PLAYBACK_PREVIEW} from "../../const";
import {MoviePropType} from "../../prop-types";
import {VideoPlayerMode} from "../../hocs/with-video/with-video";
import {withVideoPlayer, VideoPlayerStatus} from "../../hocs/with-video-player/with-video-player";


const SmallMovieCard = (props) => {
  const {
    movie,
    onClick,
    renderVideoPlayer,
    currentVideoPlayerStatus,
    setVideoPlayerStatus
  } = props;
  const {title, smallPictureUrl, previewUrl} = movie;
  let timer = null;

  const lossHoverFromCard = () => {
    if (timer) {
      clearTimeout(timer);
    }

    if (currentVideoPlayerStatus === VideoPlayerStatus.ON_PLAY) {
      setVideoPlayerStatus(VideoPlayerStatus.ON_PAUSE);
    }
  };

  const handleCardClick = (event) => {
    event.preventDefault();
    lossHoverFromCard();
    onClick(movie);
  };

  const handleCardHover = () => {
    timer = setTimeout(
        setVideoPlayerStatus.bind(null, VideoPlayerStatus.ON_PLAY),
        DELAY_PLAYBACK_PREVIEW
    );
  };

  const handleCardLeave = () => {
    lossHoverFromCard();
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
      onClick={handleCardClick}
    >
      <div className="small-movie-card__image">
        {renderVideoPlayer(previewUrl, smallPictureUrl)}

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
  renderVideoPlayer: PropTypes.func.isRequired,
  currentVideoPlayerStatus: PropTypes.string.isRequired,
  setVideoPlayerStatus: PropTypes.func.isRequired,
};


const SmallMovieCardWithVideoPlayer = withVideoPlayer(SmallMovieCard, VideoPlayerMode.PREVIEW);


export {
  SmallMovieCard,
  SmallMovieCardWithVideoPlayer,
};
