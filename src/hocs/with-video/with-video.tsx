import * as React from "react";
import {Subtract} from "utility-types";

import {MovieType, PageType} from "../../types";
import {AppRoute} from "../../const";
import {history} from "../../history";


interface Props {
  src: string;
  posterUrl: string;
  playerMode: string;
  activeMovie: MovieType;
  activePage?: string,
  prevPage: string;
  onChangePage: (newPage: string) => void;
  setVideoPlayerMode: (newValue: string) => void;
  setVideoPlayerStatus: (newPlayerStatus: string) => void;
  playerStatus: string;
}

interface State {
  progress: number;
  isLoading: boolean;
}

interface InjectingProps {
  playerMode: string;
  isLoading: boolean;
  isPlaying: boolean;
  duration: number;
  progress: number;
  onPlayButtonClick: () => void;
  onExitButtonClick: (event: Event) => void;
  onFullScreenButtonClick: (mode: string) => void;
}


const VideoPlayerMode = {
  PREVIEW: `PREVIEW`,
  SMALL_SCREEN: `SMALL_SCREEN`,
  FULL_SCREEN: `FULL_SCREEN`,
};


const videoOptions = {
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

const VideoPlayerStatus = {
  ON_AUTOPLAY: `on-autoplay`,
  ON_PLAY: `on-play`,
  ON_PAUSE: `on-pause`,
  ON_RESET: `on-reset`,
};


const withVideo = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectingProps>;

  class WithVideo extends React.PureComponent<T, State> {
    private videoRef: React.RefObject<HTMLVideoElement>;
    private duration: number | null;

    constructor(props) {
      super(props);

      this.videoRef = React.createRef();
      this.duration = null;

      this.state = {
        progress: 0,
        isLoading: true,
      };
    }

    componentDidMount() {
      const {src, playerMode} = this.props;
      const {isSound} = videoOptions[playerMode];
      const video = this.videoRef.current;

      video.src = src;
      video.muted = !isSound;

      video.oncanplaythrough = () => {
        this.setState({
          isLoading: false,
        });

        this.duration = video.duration;
      };

      video.ontimeupdate = () => this.setState({
        progress: Math.floor(video.currentTime),
      });
    }

    componentDidUpdate() {
      const video = this.videoRef.current;
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
      const video = this.videoRef.current;

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

    handleExitButtonClick(event: Event) {
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

    handleFullScreenButtonClick(mode: string) {
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
          duration={this.duration}
          progress={progress || 0}
          onPlayButtonClick={this.handlePlayButtonClick.bind(this)}
          onExitButtonClick={this.handleExitButtonClick.bind(this)}
          onFullScreenButtonClick={this.handleFullScreenButtonClick.bind(this)}
        >
          <video
            ref={this.videoRef}
            className="player__video"
            poster={posterUrl}
            autoPlay={isPlaying}
          />
        </Component>
      );
    }
  }


  return WithVideo;
};


export {
  videoOptions,
  VideoPlayerMode,
  VideoPlayerStatus,
  withVideo,
};
