import PropTypes from "prop-types";
import React, {PureComponent, createRef} from "react";

import {VideoPlayerMode} from "../../components/player/player";


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
      const {src, isSound} = this.props;
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
      const {posterUrl, videoHeight, playerMode, isPlaying} = this.props;

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
    videoHeight: PropTypes.number.isRequired,
    playerMode: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isSound: PropTypes.bool.isRequired,
  };


  return WithVideo;
};
