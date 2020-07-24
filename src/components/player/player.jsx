import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducers/reducer";
import {withVideo, VideoPlayerMode} from "../../hocs/with-video/with-video";


const getFormatedTimeLeft = (time) => {
  const seconds = Math.round(time % 60);
  const minutes = Math.floor(time / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours}:${minutes}:${seconds} `;
};


const PlayerComponent = (props) => {
  const {
    playerMode,
    isPlaying,
    duration,
    progress,
    children,
    onPlayButtonClick,
    onExitButtonClick,
    onFullScreenButtonClick,
  } = props;
  const timeLeft = duration ? getFormatedTimeLeft(duration - progress) : 0;
  const progressValue = duration ? progress * 100 / duration : 0;

  const getPlayer = () => {
    switch (playerMode) {
      case VideoPlayerMode.SMALL_SCREEN:
      case VideoPlayerMode.FULL_SCREEN:
        return (
          <div className={playerMode === VideoPlayerMode.FULL_SCREEN ? `player` : ``}>
            {children}

            <button
              type="button"
              className="player__exit"
              onClick={onExitButtonClick}
            >Exit</button>

            <div
              className="player__controls"
              style={{position: `${playerMode === VideoPlayerMode.FULL_SCREEN ? `absolute` : `relative`}`}}>
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
                <div className="player__name">Transpotting</div>

                {playerMode === VideoPlayerMode.SMALL_SCREEN &&
                <button
                  type="button"
                  className="player__full-screen"
                  onClick={onFullScreenButtonClick}
                >
                  <svg viewBox="0 0 27 27" width="27" height="27">
                    <use xlinkHref="#full-screen" />
                  </svg>
                  <span>Full screen</span>
                </button>}
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


PlayerComponent.propTypes = {
  playerMode: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  duration: PropTypes.number,
  progress: PropTypes.number.isRequired,
  activePage: PropTypes.string,
  prevPage: PropTypes.string.isRequired,
  playerStartTime: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  setPlayerStartTime: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};


const mapStateToProps = (state) => ({
  activePage: state.activePage,
  prevPage: state.prevPage,
  playerStartTime: state.playerStartTime,
});

const mapDispatchToProps = (dispatch) => ({
  onChangePage(newPage) {
    dispatch(ActionCreator.changeActivePage(newPage));
  },
  setPlayerStartTime(currentTime) {
    dispatch(ActionCreator.setPlayerStartTime(currentTime));
  },
});

const PlayerComponentWithVideo = withVideo(PlayerComponent);
const PlayerWithVideo = connect(mapStateToProps, mapDispatchToProps)(PlayerComponentWithVideo);


export {
  PlayerComponent,
  PlayerComponentWithVideo,
  PlayerWithVideo,
};
