import React, {PureComponent} from 'react';
import {VideoPlayer, VideoPlayerMode, VideoPlayerStatus} from '../../components/video-player/video-player.jsx';


export const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        //isPlaying: null,
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
        //isPlaying,
        playerStatus: newPlayerStatus,
      });
    }

    _renderPlayer(src, posterUrl, playerMode) {
      const {/* isPlaying */ playerStatus} = this.state;
      const options = this._getPlayerOptions(playerMode);


      return (
        <VideoPlayer
          src={src}
          posterUrl={posterUrl}
          videoHeight={options.videoHeight}
          isFullScreen={options.isFullScreen}
          //isPlaying={isPlaying === null ? options.isAutoPlay : isPlaying}
          playerStatus={playerStatus}
          isAutoPlay={options.isAutoPlay}
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
