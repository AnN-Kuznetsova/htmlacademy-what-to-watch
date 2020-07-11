import React, {PureComponent} from 'react';
import {VideoPlayer, VideoPlayerMode} from '../../components/video-player/video-player';


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

    getPlayerOptions(playerMode) {
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

    setVideoPlayerStatus(newPlayerStatus) {
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

    getVideoElement(videoElement) {
      this._videoElement = videoElement;
    }

    getPlayingValue() {
      switch (this.state.playerStatus) {
        case VideoPlayerStatus.ON_AUTOPLAY:
          return this.getPlayerOptions(this._playerMode).isAutoPlay;
        case VideoPlayerStatus.ON_PLAY:
          return true;
        case VideoPlayerStatus.ON_PAUSE:
        case VideoPlayerStatus.ON_RESET:
          return false;
        default:
          throw new Error(`Unknown type of playing state.`);
      }
    }

    renderPlayer(src, posterUrl, playerMode) {
      this._playerMode = playerMode;

      const options = this.getPlayerOptions(playerMode);
      const isPlaying = this.getPlayingValue();

      return (
        <VideoPlayer
          src={src}
          posterUrl={posterUrl}
          videoHeight={options.videoHeight}
          playerMode={playerMode}
          isPlaying={isPlaying}
          isSound={options.isSound}
          getVideoElement={this.getVideoElement.bind(this)}
        />
      );
    }

    render() {
      return (
        <Component
          {...this.props}
          renderVideoPlayer={this.renderPlayer.bind(this)}
          currentVideoPlayerStatus={this.state.playerStatus}
          setVideoPlayerStatus={this.setVideoPlayerStatus.bind(this)}
        />
      );
    }
  }


  WithVideoPlayer.propTypes = {};


  return WithVideoPlayer;
};
