import PropTypes from "prop-types";
import React from "react";
import {mount} from "enzyme";

import {withVideo, VideoPlayerMode, VideoPlayerStatus} from "../../hocs/with-video/with-video";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};
window.HTMLMediaElement.prototype.load = () => {};

const MockPlayer = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockPlayer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const props = {
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  posterUrl: `poster-url`,
  playerMode: null,
  activeMovie: mockPromoMovie,
  activePage: ``,
  prevPage: ``,
  onChangePage: () => {},
  setVideoPlayerMode: () => {},
  setVideoPlayerStatus: () => {},
  playerStatus: VideoPlayerStatus.ON_AUTOPLAY,
};

const PlayerWithVideo = withVideo(MockPlayer);


describe(`withVideo e2e-tests`, () => {
  it(`Should call "play()" when playerStatus comes "ON_PLAY"`, () => {
    props.playerMode = VideoPlayerMode.PREVIEW;
    props.playerStatus = VideoPlayerStatus.ON_PLAY;

    const videoPlayerElement = mount(<PlayerWithVideo {...props} />);
    const {_videoRef} = videoPlayerElement.instance();

    window.HTMLMediaElement.prototype.canplaythrough = () => {
      videoPlayerElement.instance().setState({
        isLoading: false,
      });
    };

    _videoRef.current.canplaythrough();

    jest.spyOn(_videoRef.current, `play`);
    videoPlayerElement.instance().componentDidMount();
    videoPlayerElement.instance().componentDidUpdate();

    expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
  });


  it(`Should call "pause()" when playerStatus comes "ON_PAUSE" and player mode is "FULL_SCREEN"`, () => {
    props.playerMode = VideoPlayerMode.FULL_SCREEN;
    props.playerStatus = VideoPlayerStatus.ON_PAUSE;

    const videoPlayerElement = mount(<PlayerWithVideo {...props} />);
    const {_videoRef} = videoPlayerElement.instance();

    window.HTMLMediaElement.prototype.canplaythrough = () => {
      videoPlayerElement.instance().setState({
        isLoading: false,
      });
    };

    _videoRef.current.canplaythrough();

    jest.spyOn(_videoRef.current, `pause`);
    videoPlayerElement.instance().componentDidUpdate();

    expect(_videoRef.current.pause).toHaveBeenCalledTimes(1);
  });


  it(`Should call "load()" when playerStatus comes "ON_PAUSE" and player mode is "PREVIEW"`, () => {
    props.playerMode = VideoPlayerMode.PREVIEW;
    props.playerStatus = VideoPlayerStatus.ON_PAUSE;

    const videoPlayerElement = mount(<PlayerWithVideo {...props} />);
    const {_videoRef} = videoPlayerElement.instance();

    window.HTMLMediaElement.prototype.canplaythrough = () => {
      videoPlayerElement.instance().setState({
        isLoading: false,
      });
    };

    _videoRef.current.canplaythrough();

    jest.spyOn(_videoRef.current, `load`);
    videoPlayerElement.instance().componentDidUpdate();

    expect(_videoRef.current.load).toHaveBeenCalledTimes(1);
  });


  it(`Video element should be cleared when the component is unmounted`, () => {
    props.playerMode = VideoPlayerMode.PREVIEW;
    props.playerStatus = VideoPlayerStatus.ON_PAUSE;

    const videoPlayerElement = mount(<PlayerWithVideo {...props} />);
    const {_videoRef} = videoPlayerElement.instance();

    window.HTMLMediaElement.prototype.canplaythrough = () => {
      videoPlayerElement.instance().setState({
        isLoading: false,
      });
    };

    _videoRef.current.canplaythrough();

    videoPlayerElement.instance().componentWillUnmount();

    expect(_videoRef.current.oncanplaythrough).toBeNull();
    expect(_videoRef.current.ontimeupdate).toBeNull();
  });
});
