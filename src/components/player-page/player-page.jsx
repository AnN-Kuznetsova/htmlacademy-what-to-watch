import PropTypes from "prop-types";
import React from "react";

import {MoviePropType} from "../../prop-types";
import {VideoPlayerMode} from "../../hocs/with-video/with-video";
import {withVideoPlayer} from "../../hocs/with-video-player/with-video-player";


const PlayerPageComponent = (props) => {
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


PlayerPageComponent.propTypes = {
  movie: MoviePropType.isRequired,
  renderVideoPlayer: PropTypes.func.isRequired,
};


const PlayerPage = withVideoPlayer(PlayerPageComponent, VideoPlayerMode.FULL_SCREEN);


export {
  PlayerPageComponent,
  PlayerPage,
};
