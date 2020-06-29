import React, {PureComponent} from 'react';
import {VideoPlayer} from '../../components/video-player/video-player.jsx';


export const VideoPlayerMode = {
  PREVIEW: `preview`,
  FULL_SCREEN: `full-screen`,
};


export const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: true, //this.props,
      };
    }

    _getPlayerOptions(playerMode) {
      switch (playerMode) {
        case VideoPlayerMode.PREVIEW:
          return {
            isFullScreen: false,
            isPlaying: false,
            isSound: false,
            videoHeight: 175,
          };
        case VideoPlayerMode.FULL_SCREEN:
        default:
          return null;
      }
    }

    _renderPlayer(src, posterUrl, playerMode) {
      const {isPlaying} = this.state;
      const options = this._getPlayerOptions(playerMode);

      return (
        <VideoPlayer
          src={src}
          posterUrl={posterUrl}
          videoHeight={options.videoHeight}
          isFullScreen={options.isFullScreen}
          isPlaying={isPlaying}
          isSound={options.isSound}
        />
      );
    }

    render() {
      return (
        <Component
          {...this.props}
          renderVideoPlayer={this._renderPlayer.bind(this)}
        />
      );
    }
  }


  WithVideoPlayer.propTypes = {};


  return WithVideoPlayer;
};
