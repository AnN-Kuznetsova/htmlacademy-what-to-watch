import React, {PureComponent} from 'react';
import {VideoPlayer, VideoPlayerMode} from '../../components/video-player/video-player.jsx';


export const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: null,
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

    _setMoviePlayingStatus(isPlaying) {
      this.setState({
        isPlaying,
      });
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
          setMoviePlayingStatus={this._setMoviePlayingStatus.bind(this)}
        />
      );
    }
  }


  WithVideoPlayer.propTypes = {};


  return WithVideoPlayer;
};
