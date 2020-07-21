import PropTypes from "prop-types";
import React from "react";
import {mount} from "enzyme";

import {withVideo, VideoPlayerMode} from "../../hocs/with-video/with-video";


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
  isPlaying: null,
};

const PlayerWithVideo = withVideo(MockPlayer);


describe(`withVideo e2e-tests`, () => {
  it(`Should call "play()" when isPlaying comes "true"`, () => {
    props.playerMode = VideoPlayerMode.PREVIEW;
    props.isPlaying = true;

    const videoPlayerElement = mount(<PlayerWithVideo {...props} />);
    const {_videoRef} = videoPlayerElement.instance();

    jest.spyOn(_videoRef.current, `play`);
    videoPlayerElement.instance().componentDidMount();
    videoPlayerElement.instance().componentDidUpdate();

    expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
  });


  it(`Should call "pause()" when isPlaying comes "false" and player mode is "FULL_SCREEN"`, () => {
    props.playerMode = VideoPlayerMode.FULL_SCREEN;
    props.isPlaying = false;

    const videoPlayerElement = mount(<PlayerWithVideo {...props} />);
    const {_videoRef} = videoPlayerElement.instance();

    jest.spyOn(_videoRef.current, `pause`);
    videoPlayerElement.instance().componentDidUpdate();

    expect(_videoRef.current.pause).toHaveBeenCalledTimes(1);
  });


  it(`Should call "load()" when isPlaying comes "false" and player mode is "PREVIEW"`, () => {
    props.playerMode = VideoPlayerMode.PREVIEW;
    props.isPlaying = false;

    const videoPlayerElement = mount(<PlayerWithVideo {...props} />);
    const {_videoRef} = videoPlayerElement.instance();

    jest.spyOn(_videoRef.current, `load`);
    videoPlayerElement.instance().componentDidUpdate();

    expect(_videoRef.current.load).toHaveBeenCalledTimes(1);
  });


  it(`Video element should be cleared when the component is unmounted`, () => {
    props.playerMode = VideoPlayerMode.PREVIEW;
    props.isPlaying = false;

    const videoPlayerElement = mount(<PlayerWithVideo {...props} />);
    const {_videoRef} = videoPlayerElement.instance();

    videoPlayerElement.instance().componentWillUnmount();

    expect(_videoRef.current.oncanplaythrough).toBeNull();
    expect(_videoRef.current.ontimeupdate).toBeNull();
    expect(_videoRef.current.getAttribute(`src`)).toEqual(``);
  });
});