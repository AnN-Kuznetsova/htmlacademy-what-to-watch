import PropTypes from "prop-types";
import React from "react";

import {withVideo, VideoPlayerMode} from "../../hocs/with-video/with-video";


const getFormatedTimeLeft = (time) => {
  const seconds = Math.round(time % 60);
  const minutes = Math.floor(time / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours}:${minutes}:${seconds} `;
};


const Player = (props) => {
  const {
    playerMode,
    isPlaying,
    duration,
    progress,
    children,
    onPlayButtonClick,
  } = props;
  const isFullScreen = playerMode === VideoPlayerMode.FULL_SCREEN;
  const timeLeft = getFormatedTimeLeft(duration - progress);
  const progressValue = progress * 100 / duration;

  return (
    <React.Fragment>
      {isFullScreen &&
        <div className="player">
          {children}

          <button type="button" className="player__exit">Exit</button>

          <div className="player__controls">
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

              <button type="button" className="player__full-screen">
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="#full-screen" />
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </div>
        || children
      }
    </React.Fragment>
  );
};


Player.propTypes = {
  playerMode: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};


const PlayerWithVideo = withVideo(Player);


export {
  Player,
  PlayerWithVideo,
};
