import React from "react";
import renderer from "react-test-renderer";
import {VideoPlayer} from "./video-player";
import {VideoPlayerMode} from "../../__test-data__/test-mocks.js";


const videoTrack = {
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  smallPictureUrl: `img/snatch.jpg`,
};

const props = {
  src: videoTrack.src,
  posterUrl: videoTrack.smallPictureUrl,
  videoHeight: 175,
  playerMode: VideoPlayerMode.PREVIEW,
  isPlaying: false,
  isSound: false,
  getVideoElement: () => {},
};

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};


describe(`Render VideoPlayer`, () => {
  it(`Should match with snapshot`, () => {
    const videoPlayerSnapshot = renderer.create(
        <VideoPlayer {...props} />, nodeMock
    ).toJSON();

    expect(videoPlayerSnapshot).toMatchSnapshot();
  });
});
