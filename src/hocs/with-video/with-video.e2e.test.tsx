
import * as React from "react";
import {mount} from "enzyme";

import {withVideo, VideoPlayerMode, VideoPlayerStatus} from "../../hocs/with-video/with-video";
import {noop} from "../../utils/utils";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


window.HTMLMediaElement.prototype.play = noop;
window.HTMLMediaElement.prototype.pause = noop;
window.HTMLMediaElement.prototype.load = noop;

const MockPlayer = (props: MockPlayerProps) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

interface MockPlayerProps {
  children: React.ReactNode | React.ReactNode[];
}

const props = {
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  posterUrl: `poster-url`,
  playerMode: null,
  activeMovie: mockPromoMovie,
  activePage: ``,
  prevPage: ``,
  onChangePage: noop,
  setVideoPlayerMode: noop,
  setVideoPlayerStatus: noop,
  playerStatus: VideoPlayerStatus.ON_AUTOPLAY,
};

const PlayerWithVideo = withVideo(MockPlayer);


describe(`withVideo e2e-tests`, () => {
  it(`Should call "play()" when playerStatus comes "ON_PLAY"`, () => {
    props.playerMode = VideoPlayerMode.PREVIEW;
    props.playerStatus = VideoPlayerStatus.ON_PLAY;

    const videoPlayerElement = mount(<PlayerWithVideo {...props} />);
    const {videoRef} = videoPlayerElement.instance();

    videoPlayerElement.instance().setState({
      isLoading: false,
    });

    jest.spyOn(videoRef.current, `play`);
    videoPlayerElement.instance().componentDidMount();
    videoPlayerElement.instance().componentDidUpdate();

    expect(videoRef.current.play).toHaveBeenCalledTimes(1);
  });


  it(`Should call "pause()" when playerStatus comes "ON_PAUSE" and player mode is "FULL_SCREEN"`, () => {
    props.playerMode = VideoPlayerMode.FULL_SCREEN;
    props.playerStatus = VideoPlayerStatus.ON_PAUSE;

    const videoPlayerElement = mount(<PlayerWithVideo {...props} />);
    const {videoRef} = videoPlayerElement.instance();

    videoPlayerElement.instance().setState({
      isLoading: false,
    });

    jest.spyOn(videoRef.current, `pause`);
    videoPlayerElement.instance().componentDidUpdate();

    expect(videoRef.current.pause).toHaveBeenCalledTimes(1);
  });


  it(`Should call "load()" when playerStatus comes "ON_PAUSE" and player mode is "PREVIEW"`, () => {
    props.playerMode = VideoPlayerMode.PREVIEW;
    props.playerStatus = VideoPlayerStatus.ON_PAUSE;

    const videoPlayerElement = mount(<PlayerWithVideo {...props} />);
    const {videoRef} = videoPlayerElement.instance();

    videoPlayerElement.instance().setState({
      isLoading: false,
    });

    jest.spyOn(videoRef.current, `load`);
    videoPlayerElement.instance().componentDidUpdate();

    expect(videoRef.current.load).toHaveBeenCalledTimes(1);
  });


  it(`Video element should be cleared when the component is unmounted`, () => {
    props.playerMode = VideoPlayerMode.PREVIEW;
    props.playerStatus = VideoPlayerStatus.ON_PAUSE;

    const videoPlayerElement = mount(<PlayerWithVideo {...props} />);
    const {videoRef} = videoPlayerElement.instance();

    videoPlayerElement.instance().setState({
      isLoading: false,
    });

    videoPlayerElement.instance().componentWillUnmount();

    expect(videoRef.current.oncanplaythrough).toBeNull();
    expect(videoRef.current.ontimeupdate).toBeNull();
  });
});
