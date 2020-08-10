import * as React from "react";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducers/application/application";
import {MovieType} from "../../types";
import {getActivePage, getPrevPage, getActiveMovie} from "../../reducers/application/selectors";
import {withVideo, VideoPlayerMode} from "../../hocs/with-video/with-video";


interface Props {
  playerMode: string;
  isLoading: boolean;
  isPlaying: boolean;
  duration: number;
  progress: number;
  activeMovie: MovieType;
  activePage: string;
  prevPage: string;
  onChangePage: (newPage: string) => void;
  children: React.ReactNode | React.ReactNode[];
  onPlayButtonClick: () => void;
  onExitButtonClick: () => void;
  onFullScreenButtonClick: (mode: string) => void;
}


const getFormatedTimeLeft = (time) => {
  const seconds = Math.round(time % 60);
  const minutes = Math.floor(time / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours}:${minutes}:${seconds} `;
};


const PlayerComponent: React.FunctionComponent<Props> = (props: Props) => {
  const {
    playerMode,
    isLoading,
    isPlaying,
    duration,
    progress,
    activeMovie,
    children,
    onPlayButtonClick,
    onExitButtonClick,
    onFullScreenButtonClick,
  } = props;
  const timeLeft = duration ? getFormatedTimeLeft(duration - progress) : 0;
  const progressValue = duration ? progress * 100 / duration : 0;
  const playerRef: React.RefObject<HTMLDivElement> = React.createRef();

  const handleFullScreenButtonClick = () => {
    if (playerMode === VideoPlayerMode.SMALL_SCREEN) {
      playerRef.current.requestFullscreen();
      onFullScreenButtonClick(VideoPlayerMode.FULL_SCREEN);
    } else if (playerMode === VideoPlayerMode.FULL_SCREEN) {
      document.exitFullscreen();
      onFullScreenButtonClick(VideoPlayerMode.SMALL_SCREEN);
    }
  };

  const getPlayer = () => {
    switch (playerMode) {
      case VideoPlayerMode.SMALL_SCREEN:
      case VideoPlayerMode.FULL_SCREEN:
        return (
          <div
            className="player"
            ref={playerRef}>
            {children}

            <button
              type="button"
              className="player__exit"
              onClick={onExitButtonClick}
            >Exit</button>

            <div className="player__controls" >
              <div className="player__controls-row">
                <div className="player__time">
                  <progress className="player__progress" value={progressValue} max="100" />
                  <div className="player__toggler" style={{left: `${progressValue}%`}}>Toggler</div>
                </div>
                <div className="player__time-value">{timeLeft}</div>
              </div>

              <div className="player__controls-row">
                <button
                  type="button"
                  className="player__play"
                  disabled={isLoading}
                  onClick={onPlayButtonClick}
                >
                  {isPlaying &&
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause" />
                  </svg>
                  ||
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  }
                  <span>{isPlaying && `Pause` || `Play`}</span>
                </button>
                <div className="player__name">{activeMovie.title}</div>

                <button
                  className="player__full-screen"
                  onClick={handleFullScreenButtonClick}
                >
                  <svg viewBox="0 0 27 27" width="27" height="27">
                    <use xlinkHref="#full-screen" />
                  </svg>
                  <span>Full screen</span>
                </button>
              </div>
            </div>
          </div>
        );

      case VideoPlayerMode.PREVIEW:
      default:
        return (
          <React.Fragment>
            {children}
          </React.Fragment>
        );
    }
  };

  return getPlayer();
};


const mapStateToProps = (state) => ({
  activePage: getActivePage(state),
  activeMovie: getActiveMovie(state),
  prevPage: getPrevPage(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangePage(newPage) {
    dispatch(ActionCreator.changeActivePage(newPage));
  },
});

const PlayerComponentWithVideo = withVideo(PlayerComponent);
const PlayerWithVideo = connect(mapStateToProps, mapDispatchToProps)(PlayerComponentWithVideo);


export {
  PlayerComponent,
  PlayerComponentWithVideo,
  PlayerWithVideo,
};
