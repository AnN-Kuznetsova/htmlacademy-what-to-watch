import PropTypes from "prop-types";
import React from "react";

import {withVideo} from "../../hocs/with-video/with-video";


export const VideoPlayerMode = {
  PREVIEW: `preview`,
  FULL_SCREEN: `full-screen`,
};


const Player = (props) => {
  const {playerMode, children} = props;
  const isFullScreen = playerMode === VideoPlayerMode.FULL_SCREEN;

  return (
    <div className={isFullScreen ? `player` : ``}>
      {children}

      {isFullScreen && <button type="button" className="player__exit">Exit</button>}

      {isFullScreen &&
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100" />
              <div className="player__toggler" style={{left: `30%`}}>Toggler</div>
            </div>
            <div className="player__time-value">1:30:29</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s" />
              </svg>
              <span>Play</span>
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
      }
    </div>
  );
};


Player.propTypes = {
  playerMode: PropTypes.string.isRequired,
  // isPlaying: PropTypes.bool.isRequired,
  // isSound: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};


const PlayerWithVideo = withVideo(Player);


export {
  Player,
  PlayerWithVideo,
};
