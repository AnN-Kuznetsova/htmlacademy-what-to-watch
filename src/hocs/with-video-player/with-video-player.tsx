import * as React from 'react';
import {Subtract} from 'utility-types';

import {PlayerWithVideo} from '../../components/player/player';
import {VideoPlayerStatus, VideoPlayerMode} from "../with-video/with-video";


interface State {
  playerStatus: string;
  playerMode: string;
}

interface InjectingProps {
  renderVideoPlayer: (src: string, posterUrl: string) => React.ReactNode;
  currentVideoPlayerStatus: string;
  setVideoPlayerStatus: (newPlayerStatus: string) => void;
}

export const withVideoPlayer = (Component, playerMode) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithVideoPlayer extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        playerStatus: VideoPlayerStatus.ON_AUTOPLAY,
        playerMode,
      };
    }

    setVideoPlayerMode(newValue: string) {
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


  return WithVideoPlayer;
};
