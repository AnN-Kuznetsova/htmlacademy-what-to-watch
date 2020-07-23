import React from "react";
import renderer from "react-test-renderer";

import {PlayerComponent} from "./player";
import {VideoPlayerMode} from "../../hocs/with-video/with-video";


const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const props = {
  playerMode: ``,
  isPlaying: false,
  duration: 105,
  progress: 0,
  activePage: ``,
  prevPage: ``,
  playerStartTime: 0,
  onChangePage: () => {},
  setPlayerStartTime: () => {},
};


describe(`Render Player`, () => {
  it(`Should match with snapshot when player mode is "PREVIEW"`, () => {
    props.playerMode = VideoPlayerMode.PREVIEW;

    const videoPlayerSnapshot = renderer.create(
        <PlayerComponent {...props} >
          <video />
        </PlayerComponent>, nodeMock
    ).toJSON();

    expect(videoPlayerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when player mode is "SMALL_SCREEN"`, () => {
    props.playerMode = VideoPlayerMode.SMALL_SCREEN;

    const videoPlayerSnapshot = renderer.create(
        <PlayerComponent {...props} >
          <video />
        </PlayerComponent>, nodeMock
    ).toJSON();

    expect(videoPlayerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when player mode is "FULL_SCREEN"`, () => {
    props.playerMode = VideoPlayerMode.FULL_SCREEN;

    const videoPlayerSnapshot = renderer.create(
        <PlayerComponent {...props} >
          <video />
        </PlayerComponent>, nodeMock
    ).toJSON();

    expect(videoPlayerSnapshot).toMatchSnapshot();
  });
});
