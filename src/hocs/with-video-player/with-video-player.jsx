import React, {PureComponent} from 'react';
import {VideoPlayer, VideoPlayerMode} from '../../components/video-player/video-player.jsx';


export const VideoPlayerStatus = {
  ON_AUTOPLAY: `on-autoplay`,
  ON_PLAY: `on-play`,
  ON_PAUSE: `on-pause`,
  ON_RESET: `on-reset`,
};


export const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        playerStatus: VideoPlayerStatus.ON_AUTOPLAY,
      };

      this._playerMode = null;
      this._videoElement = null;
    }

    _getPlayerOptions(playerMode) {
      switch (playerMode) {
        case VideoPlayerMode.PREVIEW:
          return {
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
      }, () => {
        if (this.state.playerStatus === VideoPlayerStatus.ON_PAUSE && this._playerMode === VideoPlayerMode.PREVIEW) {
          this._videoElement.load();
          this.setState({
            playerStatus: VideoPlayerStatus.ON_RESET,
          });
        }
      });
    }

    _getVideoElement(videoElement) {
      this._videoElement = videoElement;
    }

    _getPlayingValue() {
      switch (this.state.playerStatus) {
        case VideoPlayerStatus.ON_AUTOPLAY:
          return this._getPlayerOptions(this._playerMode).isAutoPlay;
        case VideoPlayerStatus.ON_PLAY:
          return true;
        case VideoPlayerStatus.ON_PAUSE:
        case VideoPlayerStatus.ON_RESET:
          return false;
        default:
          throw new Error(`Unknown type of playing state.`);
      }
    }

    _renderPlayer(src, posterUrl, playerMode) {
      this._playerMode = playerMode;

      const options = this._getPlayerOptions(playerMode);
      const isPlaying = this._getPlayingValue();

      return (
        <VideoPlayer
          src={src}
          posterUrl={posterUrl}
          videoHeight={options.videoHeight}
          playerMode={playerMode}
          isPlaying={isPlaying}
          isSound={options.isSound}
          getVideoElement={this._getVideoElement.bind(this)}
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
