import React from "react";
import {mount} from "enzyme";

import {VideoPlayerMode} from "../with-video/with-video";
import {withVideoPlayer, VideoPlayerStatus} from "./with-video-player";


const MockComponent = () => {
  return (
    <div />
  );
};


describe(`withVideoPlayer e2e-tests`, () => {
  describe(`Set correct player status and value of isPlaying`, () => {
    const ComponentWithVideoPlayer = withVideoPlayer(MockComponent, VideoPlayerMode.PREVIEW);
    const componentWithPlayerElement = mount(<ComponentWithVideoPlayer />);
    const componentWithPlayerInstance = componentWithPlayerElement.instance();


    it(`Player status "ON_AUTOPLAY": isPlaying is false when VideoPlayerMode is "PREVIEW"`, () => {
      expect(componentWithPlayerInstance.state.playerStatus).toEqual(VideoPlayerStatus.ON_AUTOPLAY);
      expect(componentWithPlayerInstance.state.playerMode).toEqual(VideoPlayerMode.PREVIEW);
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
    const ComponentWithVideoPlayer = withVideoPlayer(MockComponent, VideoPlayerMode.PREVIEW);
    const componentWithPlayerElement = mount(<ComponentWithVideoPlayer />);
    const componentWithPlayerInstance = componentWithPlayerElement.instance();
    const spyOnRenderPlayer = jest.spyOn(componentWithPlayerInstance, `renderPlayer`);
    const src = `pathSrc`;
    const posterUrl = `pathPosterUrl`;

    const videoPlayer = spyOnRenderPlayer.call(componentWithPlayerInstance, src, posterUrl);

    expect(videoPlayer.props.src).toEqual(src);
    expect(videoPlayer.props.posterUrl).toEqual(posterUrl);
    expect(videoPlayer.props.isPlaying).toEqual(false);
  });
});
