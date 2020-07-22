import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducers/reducer";
import {MoviePropType} from "../../prop-types";
import {VideoPlayerMode} from "../../hocs/with-video/with-video";
import {withVideoPlayer} from "../../hocs/with-video-player/with-video-player";


const PlayerPageComponent = (props) => {
  const {
    movie,
    renderVideoPlayer,
  } = props;

  return (
    <React.Fragment>
      {renderVideoPlayer(movie.previewUrl, movie.smallPictureUrl)}
    </React.Fragment>
  );
};


PlayerPageComponent.propTypes = {
  movie: MoviePropType.isRequired,
  renderVideoPlayer: PropTypes.func.isRequired,
  activePage: PropTypes.string,
  prevPage: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  setPlayerCurrentTime: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  activePage: state.activePage,
  prevPage: state.prevPage,
  progress: state.playerCurrentTime,
});

const mapDispatchToProps = (dispatch) => ({
  onChangePage(newPage) {
    dispatch(ActionCreator.changeActivePage(newPage));
  },
  setPlayerCurrentTime(currentTime) {
    dispatch(ActionCreator.setPlayerCurrentTime(currentTime));
  },
});

const PlayerPageComponentWithPlayer = withVideoPlayer(PlayerPageComponent, VideoPlayerMode.FULL_SCREEN);
const PlayerPage = connect(mapStateToProps, mapDispatchToProps)(PlayerPageComponentWithPlayer);


export {
  PlayerPageComponent,
  PlayerPageComponentWithPlayer,
  PlayerPage,
};
