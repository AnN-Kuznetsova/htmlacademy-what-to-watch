import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {MoviePropType} from "../../prop-types";
import {PageType} from "../../const";
import {VideoPlayerMode} from "../../hocs/with-video/with-video";
import {withVideoPlayer} from "../../hocs/with-video-player/with-video-player";
import {getMovieById} from "../../reducers/data/selectors";


class PlayerPageComponent extends PureComponent {
  componentWillMount() {
    this.props.onOpenPlayerPage(this.props.movie);
  }

  componentDidUpdate() {
    this.props.onOpenPlayerPage(this.props.movie);
  }

  render() {
    const {
      movie,
      renderVideoPlayer,
    } = this.props;

    return (
      <React.Fragment>
        {renderVideoPlayer(movie.videoUrl, movie.smallPictureUrl)}
      </React.Fragment>
    );
  }
}


PlayerPageComponent.propTypes = {
  movie: MoviePropType.isRequired,
  onOpenPlayerPage: PropTypes.func.isRequired,
  renderVideoPlayer: PropTypes.func.isRequired,
};


const mapStateToProps = (state, props) => {
  const {routeProps} = props;
  const movieId = +routeProps.match.params.id;

  return {
    movie: getMovieById(state, movieId),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onOpenPlayerPage(movie) {
    dispatch(ApplicationActionCreator.changeActiveMovie(movie));
    dispatch(ApplicationActionCreator.changeActivePage(PageType.PLAYER));
  },
});

const PlayerPageComponentConnect = connect(mapStateToProps, mapDispatchToProps)(PlayerPageComponent);
const PlayerPage = withVideoPlayer(PlayerPageComponentConnect, VideoPlayerMode.FULL_SCREEN);


export {
  PlayerPageComponent,
  PlayerPageComponentConnect,
  PlayerPage,
};
