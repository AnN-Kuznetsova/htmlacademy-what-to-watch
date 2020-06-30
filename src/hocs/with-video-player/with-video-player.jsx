import React, {PureComponent} from 'react';
import {VideoPlayer, VideoPlayerMode} from '../../components/video-player/video-player.jsx';


export const VideoPlayerStatus = {
  ON_AUTOPLAY: `on-autoplay`,
  ON_PLAY: `on-play`,
  ON_PAUSE: `on-pause`,
};


export const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        playerStatus: VideoPlayerStatus.ON_AUTOPLAY,
      };
    }

    _getPlayerOptions(playerMode) {
      switch (playerMode) {
        case VideoPlayerMode.PREVIEW:
          return {
            isFullScreen: false,
            isAutoPlay: false,
            isSound: false,
            videoHeight: 175,
          };
        case VideoPlayerMode.FULL_SCREEN:
        default:
          return null;
      }
    }

    _setVideoPlayerStatus(newPlayerStatus) {
      this.setState({
        playerStatus: newPlayerStatus,
      });
    }

    _getPlayingValue() {
      switch (this.state.playerStatus) {
        case VideoPlayerStatus.ON_AUTOPLAY:
          return null;
        case VideoPlayerStatus.ON_PLAY:
          return true;
        case VideoPlayerStatus.ON_PAUSE:
          return false;
        default:
          throw new Error(`Unknown type of playing state.`);
      }
    }

    _renderPlayer(src, posterUrl, playerMode) {
      const options = this._getPlayerOptions(playerMode);
      const isPlaying = this._getPlayingValue();

      return (
        <VideoPlayer
          src={src}
          posterUrl={posterUrl}
          videoHeight={options.videoHeight}
          isFullScreen={options.isFullScreen}
          isPlaying={isPlaying === null ? options.isAutoPlay : isPlaying}
          isSound={options.isSound}
        />
      );
    }

    render() {
      return (
        <Component
          {...this.props}
          renderVideoPlayer={this._renderPlayer.bind(this)}
          setVideoPlayerStatus={this._setVideoPlayerStatus.bind(this)}
        />
      );
    }
  }


  WithVideoPlayer.propTypes = {};


  return WithVideoPlayer;
};
