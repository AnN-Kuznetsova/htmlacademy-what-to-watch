import React from "react";
import {mount} from "enzyme";

import {withVideoPlayer} from "./with-video-player.jsx";

import {VideoPlayerStatus, VideoPlayerMode} from "../../__test-data__/test-mocks.js";


const MockComponent = () => {
  return (
    <div />
  );
};


describe(`withVideoPlayer e2e-tests`, () => {
  describe(`Set correct player status and value of "isPlaying"`, () => {
    const ComponentWithVideoPlayer = withVideoPlayer(MockComponent);
    const componentWithPlayerElement = mount(<ComponentWithVideoPlayer />);
    const componentWithPlayerInstance = componentWithPlayerElement.instance();


    it(`Player status "ON_AUTOPLAY": "isPlaying" is "false" when VideoPlayerMode is "PREVIEW"`, () => {
      componentWithPlayerInstance._playerMode = VideoPlayerMode.PREVIEW;

      expect(componentWithPlayerInstance.state.playerStatus).toEqual(VideoPlayerStatus.ON_AUTOPLAY);
      expect(componentWithPlayerInstance.getPlayingValue()).toEqual(false);
    });


    it(`Player status "ON_PLAY": "isPlaying" is "true"`, () => {
      const spyOnSetPlayerStatus = jest.spyOn(componentWithPlayerInstance, `setVideoPlayerStatus`);
      spyOnSetPlayerStatus.call(componentWithPlayerInstance, VideoPlayerStatus.ON_PLAY);

      expect(componentWithPlayerInstance.state.playerStatus).toEqual(VideoPlayerStatus.ON_PLAY);
      expect(componentWithPlayerInstance.getPlayingValue()).toEqual(true);
    });


    it(`Player status "ON_PAUSE": "isPlaying" is "false" and player status is "ON_RESET"`, () => {
      const spyOnSetPlayerStatus = jest.spyOn(componentWithPlayerInstance, `setVideoPlayerStatus`);
      spyOnSetPlayerStatus.call(componentWithPlayerInstance, VideoPlayerStatus.ON_PAUSE);

      expect(componentWithPlayerInstance.state.playerStatus).toEqual(VideoPlayerStatus.ON_RESET);
      expect(componentWithPlayerInstance.getPlayingValue()).toEqual(false);
    });
  });


  it(`Should pass the correct props to the player when VideoPlayerMode is "PREVIEW"`, () => {
    const ComponentWithVideoPlayer = withVideoPlayer(MockComponent);
    const componentWithPlayerElement = mount(<ComponentWithVideoPlayer />);
    const componentWithPlayerInstance = componentWithPlayerElement.instance();
    const spyOnRenderPlayer = jest.spyOn(componentWithPlayerInstance, `renderPlayer`);
    const src = `pathSrc`;
    const posterUrl = `pathPosterUrl`;
    const playerMode = VideoPlayerMode.PREVIEW;

    const videoPlayer = spyOnRenderPlayer.call(componentWithPlayerInstance, src, posterUrl, playerMode);

    expect(videoPlayer.props.src).toEqual(src);
    expect(videoPlayer.props.posterUrl).toEqual(posterUrl);
    expect(videoPlayer.props.playerMode).toEqual(playerMode);
    expect(videoPlayer.props.isPlaying).toEqual(false);
  });
});
