import React from "react";
import {mount} from "enzyme";
import {VideoPlayer} from "./video-player.jsx";
import {VideoPlayerMode} from "../../__test-data__/test-mocks.js";


const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

const getVideoElement = jest.fn();

const props = {
  src: ``,
  posterUrl: ``,
  videoHeight: 1,
  playerMode: VideoPlayerMode.PREVIEW,
  isPlaying: false,
  isSound: false,
  getVideoElement,
};


describe(`VideoPlayer e2e-tests`, () => {
  it(`Should return the video element after mount`, () => {
    const videoPlayerElement = mount(<VideoPlayer {...props} />, nodeMock);
    const {_videoRef} = videoPlayerElement.instance();

    expect(getVideoElement).toHaveBeenCalledTimes(1);
    expect(getVideoElement.mock.calls[0][0]).toMatchObject(_videoRef.current);
  });


  it(`Should be called "play()" when isPlaying comes "true"`, () => {
    props.isPlaying = true;

    const videoPlayerElement = mount(<VideoPlayer {...props} />, nodeMock);
    const {_videoRef} = videoPlayerElement.instance();

    jest.spyOn(_videoRef.current, `play`);
    videoPlayerElement.instance().componentDidUpdate();

    expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
  });


  it(`Should be called "pause()" when isPlaying comes "false"`, () => {
    props.isPlaying = false;

    const videoPlayerElement = mount(<VideoPlayer {...props} />, nodeMock);
    const {_videoRef} = videoPlayerElement.instance();

    jest.spyOn(_videoRef.current, `pause`);
    videoPlayerElement.instance().componentDidUpdate();

    expect(_videoRef.current.pause).toHaveBeenCalledTimes(1);
  });
});
