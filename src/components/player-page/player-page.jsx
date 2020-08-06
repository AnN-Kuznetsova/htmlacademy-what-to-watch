import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {ActionCreator as DataActionCreator} from "../../reducers/data/data";
import {MoviePropType} from "../../prop-types";
import {PageType, AppRoute} from "../../const";
import {Redirect} from "react-router-dom";
import {VideoPlayerMode} from "../../hocs/with-video/with-video";
import {withVideoPlayer} from "../../hocs/with-video-player/with-video-player";
import {getMovieById} from "../../reducers/data/selectors";


class PlayerPageComponent extends PureComponent {
  componentDidMount() {
    this.props.onOpenPlayerPage(this.props.movie);
  }

  componentDidUpdate() {
    this.props.onOpenPlayerPage(this.props.movie);
  }

  render() {
    const {
      movie,
      renderVideoPlayer,
      onError,
    } = this.props;

    if (!movie) {
      onError();
      return (<Redirect to={AppRoute.MAIN} />);
    }

    return (
      <React.Fragment>
        {renderVideoPlayer(movie.videoUrl, movie.smallPictureUrl)}
      </React.Fragment>
    );
  }
}


PlayerPageComponent.propTypes = {
  routeProps: PropTypes.object.isRequired,
  movie: MoviePropType,
  onOpenPlayerPage: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
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
  onError() {
    dispatch(DataActionCreator.setDataError({status: 404}));
    dispatch(ApplicationActionCreator.changeActivePage(PageType.ERROR));
  },
});

const PlayerPageComponentConnect = connect(mapStateToProps, mapDispatchToProps)(PlayerPageComponent);
const PlayerPage = withVideoPlayer(PlayerPageComponentConnect, VideoPlayerMode.FULL_SCREEN);


export {
  PlayerPageComponent,
  PlayerPageComponentConnect,
  PlayerPage,
};
