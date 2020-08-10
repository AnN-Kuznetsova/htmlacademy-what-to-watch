
import * as React, {PureComponent, createRef} from "react";

import {MoviePropType} from "../../prop-types";
import {PageType, AppRoute} from "../../const";
import {history} from "../../history";


export const VideoPlayerMode = {
  PREVIEW: `PREVIEW`,
  SMALL_SCREEN: `SMALL_SCREEN`,
  FULL_SCREEN: `FULL_SCREEN`,
};


export const videoOptions = {
  [VideoPlayerMode.PREVIEW]: {
    isAutoPlay: false,
    isSound: false,
  },
  [VideoPlayerMode.SMALL_SCREEN]: {
    isAutoPlay: true,
    isSound: true,
  },
  [VideoPlayerMode.FULL_SCREEN]: {
    isAutoPlay: true,
    isSound: true,
  },
};

export const VideoPlayerStatus = {
  ON_AUTOPLAY: `on-autoplay`,
  ON_PLAY: `on-play`,
  ON_PAUSE: `on-pause`,
  ON_RESET: `on-reset`,
};


export const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();
      this._duration = null;

      this.state = {
        progress: 0,
        isLoading: true,
      };
    }

    componentDidMount() {
      const {src, playerMode} = this.props;
      const {isSound} = videoOptions[playerMode];
      const video = this._videoRef.current;

      video.src = src;
      video.muted = !isSound;

      video.oncanplaythrough = () => {
        this.setState({
          isLoading: false,
        });

        this._duration = video.duration;
      };

      video.ontimeupdate = () => this.setState({
        progress: Math.floor(video.currentTime),
      });
    }

    componentDidUpdate() {
      const video = this._videoRef.current;
      const {playerMode} = this.props;
      const {isLoading} = this.state;

      if (!isLoading) {
        if (this.getPlayingValue()) {
          const playPromise = video.play();
          if (playPromise) {
            playPromise.catch(()=>{
              this.props.setVideoPlayerStatus(VideoPlayerStatus.ON_PAUSE);
            });
          }
        } else {
          if (playerMode === VideoPlayerMode.PREVIEW) {
            video.load();
          } else {
            video.pause();
          }
        }
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.oncanplaythrough = null;
      video.ontimeupdate = null;
      video.src = ``;
    }

    getPlayingValue() {
      switch (this.props.playerStatus) {
        case VideoPlayerStatus.ON_AUTOPLAY:
          return videoOptions[this.props.playerMode].isAutoPlay;
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
        this.props.setVideoPlayerStatus(VideoPlayerStatus.ON_PAUSE);
      } else {
        this.props.setVideoPlayerStatus(VideoPlayerStatus.ON_PLAY);
      }
    }

    handleExitButtonClick(event) {
      event.preventDefault();

      const {activePage, prevPage} = this.props;

      if (activePage === PageType.PLAYER) {
        const page = prevPage === PageType.MAIN ? AppRoute.MAIN : AppRoute.FILM.replace(`:id`, this.props.activeMovie.id);
        this.props.onChangePage(prevPage);
        history.push(page);
      } else {
        this.props.onChangePage(activePage);
      }
      this.props.setVideoPlayerStatus(VideoPlayerStatus.ON_AUTOPLAY);
    }

    handleFullScreenButtonClick(mode) {
      this.props.setVideoPlayerMode(mode);
    }

    render() {
      const {
        posterUrl,
        playerMode,
      } = this.props;
      const {
        isLoading,
        progress,
      } = this.state;
      const isPlaying = this.getPlayingValue();

      return (
        <Component
          {...this.props}
          playerMode={playerMode}
          isLoading={isLoading}
          isPlaying={isPlaying}
          duration={this._duration}
          progress={progress || 0}
          onPlayButtonClick={this.handlePlayButtonClick.bind(this)}
          onExitButtonClick={this.handleExitButtonClick.bind(this)}
          onFullScreenButtonClick={this.handleFullScreenButtonClick.bind(this)}
        >
          <video
            ref={this._videoRef}
            className="player__video"
            poster={posterUrl}
            autoPlay={isPlaying}
          />
        </Component>
      );
    }
  }


  WithVideo.propTypes = {
    src: PropTypes.string.isRequired,
    posterUrl: PropTypes.string.isRequired,
    playerMode: PropTypes.string.isRequired,
    activeMovie: MoviePropType.isRequired,
    activePage: PropTypes.string,
    prevPage: PropTypes.string.isRequired,
    onChangePage: PropTypes.func.isRequired,
    setVideoPlayerMode: PropTypes.func.isRequired,
    setVideoPlayerStatus: PropTypes.func.isRequired,
    playerStatus: PropTypes.string.isRequired,
  };


  return WithVideo;
};
