
import * as React from "react";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {ActionCreator as DataActionCreator} from "../../reducers/data/data";
import {MovieType, PageType} from "../../types";
import {AppRoute} from "../../const";
import {Redirect} from "react-router-dom";
import {VideoPlayerMode} from "../../hocs/with-video/with-video";
import {withVideoPlayer} from "../../hocs/with-video-player/with-video-player";
import {getMovieById} from "../../reducers/data/selectors";


interface Props {
  routeProps: object;
  movie: MovieType;
  onOpenPlayerPage: (movie: MovieType) => void;
  onError: () => void;
  renderVideoPlayer: (src: string, posterUrl: string) => React.ReactNode;
}


class PlayerPageComponent extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);

    this.handlePlayerPageOpen = this.handlePlayerPageOpen.bind(this);
  }

  componentDidMount() {
    this.handlePlayerPageOpen();
  }

  componentDidUpdate() {
    this.handlePlayerPageOpen();
  }

  handlePlayerPageOpen() {
    if (this.props.movie) {
      this.props.onOpenPlayerPage(this.props.movie);
    }
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
const PlayerPage = withVideoPlayer(PlayerPageComponentConnect, VideoPlayerMode.SMALL_SCREEN);


export {
  PlayerPageComponent,
  PlayerPageComponentConnect,
  PlayerPage,
};
