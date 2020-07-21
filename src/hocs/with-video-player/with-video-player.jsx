import React, {PureComponent} from 'react';
import {PlayerWithVideo} from '../../components/player/player';
import {VideoPlayerMode, videoOptions} from "../with-video/with-video";


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
    }

    setVideoPlayerStatus(newPlayerStatus) {
      this.setState({
        playerStatus: newPlayerStatus,
      }, () => {
        if (this.state.playerStatus === VideoPlayerStatus.ON_PAUSE && this._playerMode === VideoPlayerMode.PREVIEW) {
          this.setState({
            playerStatus: VideoPlayerStatus.ON_RESET,
          });
        }
      });
    }

    getPlayingValue() {
      switch (this.state.playerStatus) {
        case VideoPlayerStatus.ON_AUTOPLAY:
          return videoOptions[this._playerMode].isAutoPlay;
        case VideoPlayerStatus.ON_PLAY:
          return true;
        case VideoPlayerStatus.ON_PAUSE:
        case VideoPlayerStatus.ON_RESET:
          return false;
        default:
          throw new Error(`Unknown type of playing state.`);
      }
    }

    handlePlayButtonClick() {
      if (this.state.playerStatus === VideoPlayerStatus.ON_PLAY) {
        this.setVideoPlayerStatus(VideoPlayerStatus.ON_PAUSE);
      } else {
        this.setVideoPlayerStatus(VideoPlayerStatus.ON_PLAY);
      }
    }

    renderPlayer(src, posterUrl, playerMode) {
      this._playerMode = playerMode;

      return (
        <PlayerWithVideo
          src={src}
          posterUrl={posterUrl}
          playerMode={playerMode}
          isPlaying={this.getPlayingValue()}
          onPlayButtonClick={this.handlePlayButtonClick.bind(this)}
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
