
import * as React from "react";
import {Link} from "react-router-dom";

import {DELAY_PLAYBACK_PREVIEW, AppRoute} from "../../const";
import {MoviePropType} from "../../prop-types";
import {VideoPlayerMode, VideoPlayerStatus} from "../../hocs/with-video/with-video";
import {withVideoPlayer} from "../../hocs/with-video-player/with-video-player";


const SmallMovieCard = (props) => {
  const {
    movie,
    renderVideoPlayer,
    currentVideoPlayerStatus,
    setVideoPlayerStatus,
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

  const handleCardClick = () => {
    lossHoverFromCard();
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
    >
      <Link
        to={AppRoute.FILM.replace(`:id`, movie.id)}
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
      </Link>
      <h3 className="small-movie-card__title">
        <Link
          className="small-movie-card__link"
          to={AppRoute.FILM.replace(`:id`, movie.id)}
          onClick={handleCardClick}
        >{title}</Link>
      </h3>
    </article>
  );
};


SmallMovieCard.propTypes = {
  movie: MoviePropType.isRequired,
  renderVideoPlayer: PropTypes.func.isRequired,
  currentVideoPlayerStatus: PropTypes.string.isRequired,
  setVideoPlayerStatus: PropTypes.func.isRequired,
};


const SmallMovieCardWithVideoPlayer = withVideoPlayer(SmallMovieCard, VideoPlayerMode.PREVIEW);


export {
  SmallMovieCard,
  SmallMovieCardWithVideoPlayer,
};
