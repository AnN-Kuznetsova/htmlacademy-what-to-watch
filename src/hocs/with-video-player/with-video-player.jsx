import React, {PureComponent} from 'react';

import {MoviePropType} from '../../prop-types';
import {PlayerWithVideo} from '../../components/player/player';
import {VideoPlayerStatus, VideoPlayerMode} from "../with-video/with-video";


export const withVideoPlayer = (Component, playerMode) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        playerStatus: VideoPlayerStatus.ON_AUTOPLAY,
        playerMode,
        isPlayerVisible: false,
      };
    }

    componentDidUpdate(prevProps) {
      if (prevProps.movie !== this.props.movie) {
        this.setVideoPlayerVisibility(false);
      }
    }

    setVideoPlayerVisibility(newValue) {
      this.setState({
        isPlayerVisible: newValue,
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
          setVideoPlayerVisibility={this.setVideoPlayerVisibility.bind(this)}
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
          isPlayerVisible={this.state.isPlayerVisible}
          onPlayButtonClick={this.setVideoPlayerVisibility.bind(this, true)}
        />
      );
    }
  }


  WithVideoPlayer.propTypes = {
    movie: MoviePropType.isRequired,
  };


  return WithVideoPlayer;
};
