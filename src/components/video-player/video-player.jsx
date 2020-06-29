import PropTypes from "prop-types";
import React, {PureComponent, createRef} from "react";


export class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying,
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

    video.onplay = () => this.setState({
      isPlaying: true,
    });

    video.onpause = () => this.setState({
      isPlaying: false,
    });

    video.ontimeupdate = () => this.setState({
      progress: video.currentTime,
    });
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.onplay = null;
    video.onpause = null;
    video.ontimeupdate = null;
    video.src = ``;
  }

  render() {
    const {isLoading, isPlaying} = this.state;
    const {posterUrl, videoHeight, isFullScreen} = this.props;

    return (
      <div className={isFullScreen ? `player` : ``}>
        <video
          className="player__video"
          ref={this._videoRef}
          poster={posterUrl}
          autoPlay={isPlaying}
          style={{height: videoHeight}}
        >
        </video>

        {isFullScreen && <button type="button" className="player__exit">Exit</button>}

        {isFullScreen &&
          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress className="player__progress" value="30" max="100"></progress>
                <div className="player__toggler" style={{left: `30%`}}>Toggler</div>
              </div>
              <div className="player__time-value">1:30:29</div>
            </div>

            <div className="player__controls-row">
              <button type="button" className="player__play">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <div className="player__name">Transpotting</div>

              <button type="button" className="player__full-screen">
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="#full-screen"></use>
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        }
      </div>
    );
  }
}


VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  videoHeight: PropTypes.number.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isSound: PropTypes.bool.isRequired,
  //onPlayButtonClick: PropTypes.func.isRequired,
};
