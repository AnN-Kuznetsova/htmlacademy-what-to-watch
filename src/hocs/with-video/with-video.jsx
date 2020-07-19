import PropTypes from "prop-types";
import React, {PureComponent, createRef} from "react";


export const VideoPlayerMode = {
  PREVIEW: `preview`,
  FULL_SCREEN: `full-screen`,
};


export const videoOptions = {
  [VideoPlayerMode.PREVIEW]: {
    isAutoPlay: false,
    isSound: false,
    videoHeight: 175,
  },
  [VideoPlayerMode.FULL_SCREEN]: {},
};


export const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

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

      video.oncanplaythrough = () => this.setState({
        isLoading: false,
      });

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
      const {posterUrl, playerMode, isPlaying} = this.props;
      const {videoHeight} = videoOptions[playerMode];

      return (
        <Component
          {...this.props}
          playerMode={playerMode}
        >
          <video
            ref={this._videoRef}
            className="player__video"
            poster={posterUrl}
            autoPlay={isPlaying}
            style={{height: videoHeight}}
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
  };


  return WithVideo;
};
