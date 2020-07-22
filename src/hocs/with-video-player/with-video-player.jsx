import PropTypes from "prop-types";
import React, {PureComponent} from 'react';

import {PageType} from "../../const";
import {PlayerWithVideo} from '../../components/player/player';
import {VideoPlayerMode, videoOptions} from "../with-video/with-video";


export const VideoPlayerStatus = {
  ON_AUTOPLAY: `on-autoplay`,
  ON_PLAY: `on-play`,
  ON_PAUSE: `on-pause`,
  ON_RESET: `on-reset`,
};


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

    setVideoPlayerVisibility(newValue) {
      this.setState({
        isPlayerVisible: newValue,
      });
    }

    setPlayerMode(newPlayerMode) {
      this.setState({
        playerMode: newPlayerMode,
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

    getPlayingValue() {
      switch (this.state.playerStatus) {
        case VideoPlayerStatus.ON_AUTOPLAY:
          return videoOptions[this.state.playerMode].isAutoPlay;
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
      if (this.getPlayingValue()) {
        this.setVideoPlayerStatus(VideoPlayerStatus.ON_PAUSE);
      } else {
        this.setVideoPlayerStatus(VideoPlayerStatus.ON_PLAY);
      }
    }

    handleExitButtonClick() {
      const {activePage, prevPage} = this.props;

      if (activePage === PageType.PLAYER) {
        this.props.onChangePage(prevPage);
      } else {
        this.props.onChangePage(activePage);
      }
      this.setVideoPlayerVisibility(false);
      this.setVideoPlayerStatus(VideoPlayerStatus.ON_AUTOPLAY);
    }

    handleFullScreenButtonClick() {
      this.props.onChangePage(PageType.PLAYER);
    }

    renderPlayer(src, posterUrl) {
      return (
        <PlayerWithVideo
          src={src}
          posterUrl={posterUrl}
          playerMode={this.state.playerMode}
          isPlaying={this.getPlayingValue()}
          onPlayButtonClick={this.handlePlayButtonClick.bind(this)}
          onExitButtonClick={this.handleExitButtonClick.bind(this)}
          onFullScreenButtonClick={this.handleFullScreenButtonClick.bind(this)}
          progress={this.props.progress}
          setPlayerCurrentTime={this.props.setPlayerCurrentTime}
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
    activePage: PropTypes.string,
    prevPage: PropTypes.string,
    progress: PropTypes.number,
    onChangePage: PropTypes.func,
    setPlayerCurrentTime: PropTypes.func,
  };


  return WithVideoPlayer;
};
