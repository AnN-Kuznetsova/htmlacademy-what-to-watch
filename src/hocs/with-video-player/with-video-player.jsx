import PropTypes from "prop-types";
import React, {PureComponent} from 'react';
import {connect} from "react-redux";

import {ActionCreator} from "../../reducers/reducer";
import {PageType} from "../../const";
import {PlayerWithVideo} from '../../components/player/player';
import {VideoPlayerMode, videoOptions} from "../with-video/with-video";


export const VideoPlayerStatus = {
  ON_AUTOPLAY: `on-autoplay`,
  ON_PLAY: `on-play`,
  ON_PAUSE: `on-pause`,
  ON_RESET: `on-reset`,
};


export const withVideoPlayer = (Component) => {
  class WithVideoPlayerComponent extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        playerStatus: VideoPlayerStatus.ON_AUTOPLAY,
        playerMode: this.props.playerMode,
        isPlayerVisible: false,
      };
    }

    componentDidMount() {

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
      this.props.onChangePage(PageType.MAIN);
      this.setVideoPlayerVisibility(false);
      this.setVideoPlayerStatus(VideoPlayerStatus.ON_AUTOPLAY);
    }

    handleFullScreenButtonClick() {
      this.props.onChangePage(PageType.PLAYER);
    }

    renderPlayer(src, posterUrl/* , playerMode */) {
      return (
        <PlayerWithVideo
          src={src}
          posterUrl={posterUrl}
          playerMode={this.state.playerMode}
          isPlaying={this.getPlayingValue()}
          onPlayButtonClick={this.handlePlayButtonClick.bind(this)}
          onExitButtonClick={this.handleExitButtonClick.bind(this)}
          onFullScreenButtonClick={this.handleFullScreenButtonClick.bind(this)}
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


  WithVideoPlayerComponent.propTypes = {
    playerMode: PropTypes.string.isRequired,
    prevPage: PropTypes.string.isRequired,
    onChangePage: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    prevPage: state.activePage,
  });

  const mapDispatchToProps = (dispatch) => ({
    onChangePage(newPage) {
      dispatch(ActionCreator.changeActivePage(newPage));
    },
  });

  const WithVideoPlayer = connect(mapStateToProps, mapDispatchToProps)(WithVideoPlayerComponent);


  return WithVideoPlayer;
};
