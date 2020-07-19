import React from "react";
import renderer from "react-test-renderer";

import {Player} from "./player";
import {VideoPlayerMode} from "../../hocs/with-video/with-video";


const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const props = {
  playerMode: VideoPlayerMode.PREVIEW,
};


describe(`Render Player`, () => {
  it(`Should match with snapshot when player mode is "PREVIEW"`, () => {
    const videoPlayerSnapshot = renderer.create(
        <Player {...props} >
          <video />
        </Player>, nodeMock
    ).toJSON();

    expect(videoPlayerSnapshot).toMatchSnapshot();
  });
});
