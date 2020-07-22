import PropTypes from "prop-types";
import React from "react";

import {MoviePropType} from "../../prop-types";
import {VideoPlayerMode} from "../../hocs/with-video/with-video";
import {withVideoPlayer} from "../../hocs/with-video-player/with-video-player";


const PlayerPage = (props) => {
  const {
    movie,
    renderVideoPlayer,
  } = props;

  return (
    <React.Fragment>
      {renderVideoPlayer(movie.previewUrl, movie.smallPictureUrl)}
    </React.Fragment>
  );
};


PlayerPage.propTypes = {
  movie: MoviePropType.isRequired,
  renderVideoPlayer: PropTypes.func.isRequired,
};


const VideoPlayerPage = withVideoPlayer(PlayerPage, VideoPlayerMode.FULL_SCREEN);


export {
  PlayerPage,
  VideoPlayerPage,
};
