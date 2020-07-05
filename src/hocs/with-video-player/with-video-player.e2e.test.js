import React from "react";
import {VideoPlayerStatus, VideoPlayerMode} from "../../__test-data__/test-mocks.js";
import {mount} from "enzyme";
import {withVideoPlayer} from "./with-video-player.jsx";


const Component = () => {
  return (
    <div />
  );
};


describe(`withVideoPlayer e2e-tests`, () => {
  describe(`Should correctly install the player status and set the value of "isPlayin"`, () => {
    const ComponentWithVideoPlayer = withVideoPlayer(Component);
    const componentWithPlayerElement = mount(<ComponentWithVideoPlayer />);
    const componentWithPlayerInstance = componentWithPlayerElement.instance();


    it(`Player status "ON_AUTOPLAY", "isPlayin" is "false" when VideoPlayerMode is "PREVIEW"`, () => {
      componentWithPlayerInstance._playerMode = VideoPlayerMode.PREVIEW;

      expect(componentWithPlayerInstance.state.playerStatus).toEqual(VideoPlayerStatus.ON_AUTOPLAY);
      expect(componentWithPlayerInstance._getPlayingValue()).toEqual(false);
    });


    it(`Player status "ON_PLAY", "isPlaying" is "true"`, () => {
      const spyOnSetPlayerStatus = jest.spyOn(componentWithPlayerInstance, `_setVideoPlayerStatus`);
      spyOnSetPlayerStatus.call(componentWithPlayerInstance, VideoPlayerStatus.ON_PLAY);

      expect(componentWithPlayerInstance.state.playerStatus).toEqual(VideoPlayerStatus.ON_PLAY);
      expect(componentWithPlayerInstance._getPlayingValue()).toEqual(true);
    });


    it(`Player status "ON_PAUSE", "isPlaying" is "false" and should be called "video.load()"`, () => {
      const load = jest.fn();
      const mockVideoElement = {
        load,
      };

      componentWithPlayerInstance._playerMode = VideoPlayerMode.PREVIEW;

      const spyOnGetVideoElement = jest.spyOn(componentWithPlayerInstance, `_getVideoElement`);
      spyOnGetVideoElement.call(componentWithPlayerInstance, mockVideoElement);

      const spyOnSetPlayerStatus = jest.spyOn(componentWithPlayerInstance, `_setVideoPlayerStatus`);
      spyOnSetPlayerStatus.call(componentWithPlayerInstance, VideoPlayerStatus.ON_PAUSE);

      expect(componentWithPlayerInstance.state.playerStatus).toEqual(VideoPlayerStatus.ON_RESET);
      expect(componentWithPlayerInstance._getPlayingValue()).toEqual(false);
      expect(load).toHaveBeenCalledTimes(1);
    });
  });


  it(`Should correctly pass the correct props to the player when VideoPlayerMode is "PREVIEW"`, () => {
    const ComponentWithVideoPlayer = withVideoPlayer(Component);
    const componentWithPlayerElement = mount(<ComponentWithVideoPlayer />);
    const componentWithPlayerInstance = componentWithPlayerElement.instance();
    const spyOnRenderPlayer = jest.spyOn(componentWithPlayerInstance, `_renderPlayer`);
    const src = `pathSrc`;
    const posterUrl = `pathPosterUrl`;
    const playerMode = VideoPlayerMode.PREVIEW;

    const videoPlayer = spyOnRenderPlayer.call(componentWithPlayerInstance, src, posterUrl, playerMode);

    expect(videoPlayer.props.src).toEqual(src);
    expect(videoPlayer.props.posterUrl).toEqual(posterUrl);
    expect(videoPlayer.props.videoHeight).toEqual(175);
    expect(videoPlayer.props.playerMode).toEqual(playerMode);
    expect(videoPlayer.props.isPlaying).toEqual(false);
    expect(videoPlayer.props.isSound).toEqual(false);
    expect(videoPlayer.props.getVideoElement).toBeInstanceOf(Function);
  });
});
