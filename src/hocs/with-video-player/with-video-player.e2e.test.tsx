import * as React from "react";
import {mount} from "enzyme";

import {VideoPlayerMode, VideoPlayerStatus} from "../with-video/with-video";
import {withVideoPlayer} from "./with-video-player";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


const MockComponent = () => {
  return (
    <div />
  );
};


describe(`withVideoPlayer e2e-tests`, () => {
  it(`Set correct player status when VideoPlayerMode is "PREVIEW"`, () => {
    const ComponentWithVideoPlayer = withVideoPlayer(MockComponent, VideoPlayerMode.PREVIEW);
    const componentWithPlayerElement = mount(<ComponentWithVideoPlayer movie={mockPromoMovie} />);
    const componentWithPlayerInstance = componentWithPlayerElement.instance();

    expect(componentWithPlayerInstance.state.playerStatus).toEqual(VideoPlayerStatus.ON_AUTOPLAY);
    expect(componentWithPlayerInstance.state.playerMode).toEqual(VideoPlayerMode.PREVIEW);

    componentWithPlayerInstance.setVideoPlayerStatus(VideoPlayerStatus.ON_PLAY);
    expect(componentWithPlayerInstance.state.playerStatus).toEqual(VideoPlayerStatus.ON_PLAY);

    componentWithPlayerInstance.setVideoPlayerStatus(VideoPlayerStatus.ON_PAUSE);
    expect(componentWithPlayerInstance.state.playerStatus).toEqual(VideoPlayerStatus.ON_RESET);
  });


  it(`Should pass the correct props to the player when playerMode is "PREVIEW"`, () => {
    const ComponentWithVideoPlayer = withVideoPlayer(MockComponent, VideoPlayerMode.PREVIEW);
    const componentWithPlayerElement = mount(<ComponentWithVideoPlayer movie={mockPromoMovie} />);
    const componentWithPlayerInstance = componentWithPlayerElement.instance();
    const src = `pathSrc`;
    const posterUrl = `pathPosterUrl`;

    const videoPlayer = componentWithPlayerInstance.renderPlayer(src, posterUrl);

    expect(videoPlayer.props.src).toEqual(src);
    expect(videoPlayer.props.posterUrl).toEqual(posterUrl);
  });
});
