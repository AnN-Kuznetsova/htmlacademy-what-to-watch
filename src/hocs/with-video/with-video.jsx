import PropTypes from "prop-types";
import React, {PureComponent, createRef} from "react";


export const VideoPlayerMode = {
  PREVIEW: `PREVIEW`,
  SMALL_SCREEN: `SMALL_SCREEN`,
  FULL_SCREEN: `FULL_SCREEN`,
};


export const videoOptions = {
  [VideoPlayerMode.PREVIEW]: {
    isAutoPlay: false,
    isSound: false,
    isVisible: true,
  },
  [VideoPlayerMode.SMALL_SCREEN]: {
    isAutoPlay: true,
    isSound: true,
    isVisible: false,
  },
  [VideoPlayerMode.FULL_SCREEN]: {
    isAutoPlay: true,
    isSound: true,
    isVisible: true,
  },
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

      if (this.props.isPlaying) {
        video.play();
      } else {
        if (playerMode === VideoPlayerMode.PREVIEW) {
          video.load();
        } else {
          video.pause();
        }
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.oncanplaythrough = null;
      video.ontimeupdate = null;
      video.src = ``;
    }

    render() {
      const {
        posterUrl,
        playerMode,
        isPlaying,
        onPlayButtonClick,
        onExitButtonClick,
        onFullScreenButtonClick,
      } = this.props;
      const {
        progress
      } = this.state;

      return (
        <Component
          {...this.props}
          playerMode={playerMode}
          isPlaying={isPlaying}
          duration={this._duration}
          progress={progress}
          onPlayButtonClick={onPlayButtonClick}
          onExitButtonClick={onExitButtonClick}
          onFullScreenButtonClick={onFullScreenButtonClick}
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
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
    onExitButtonClick: PropTypes.func.isRequired,
    onFullScreenButtonClick: PropTypes.func.isRequired,
  };


  return WithVideo;
};
