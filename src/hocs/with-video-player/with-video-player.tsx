import * as React, {PureComponent} from 'react';

import {PlayerWithVideo} from '../../components/player/player';
import {VideoPlayerStatus, VideoPlayerMode} from "../with-video/with-video";


export const withVideoPlayer = (Component, playerMode) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        playerStatus: VideoPlayerStatus.ON_AUTOPLAY,
        playerMode,
      };
    }

    setVideoPlayerMode(newValue) {
      this.setState({
        playerMode: newValue,
      });
    }

    setVideoPlayerStatus(newPlayerStatus) {
      this.setState({
        playerStatus: newPlayerStatus,
      }, () => {
        if (this.state.playerStatus === VideoPlayerStatus.ON_PAUSE && this.state.playerMode === VideoPlayerMode.PREVIEW) {
          this.setState({
            playerStatus: VideoPlayerStatus.ON_RESET,
          });
        }
      });
    }

    renderPlayer(src, posterUrl) {
      return (
        <PlayerWithVideo
          src={src}
          posterUrl={posterUrl}
          playerMode={this.state.playerMode}
          setVideoPlayerMode={this.setVideoPlayerMode.bind(this)}
          setVideoPlayerStatus={this.setVideoPlayerStatus.bind(this)}
          playerStatus={this.state.playerStatus}
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
