import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import {PlayerComponent} from "./player";
import {VideoPlayerMode} from "../../hocs/with-video/with-video";
import {history} from "../../history";
import {noop} from "../../utils/utils";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const props = {
  playerMode: ``,
  isLoading: false,
  isPlaying: false,
  duration: 105,
  progress: 0,
  activeMovie: mockPromoMovie,
  activePage: ``,
  prevPage: ``,
  onChangePage: noop,
  onPlayButtonClick: noop,
  onExitButtonClick: noop,
  onFullScreenButtonClick: noop,
};


describe(`Render Player`, () => {
  it(`Should match with snapshot when player mode is "PREVIEW"`, () => {
    props.playerMode = VideoPlayerMode.PREVIEW;

    const videoPlayerSnapshot = renderer.create(
        <Router history={history} >
          <PlayerComponent {...props} >
            <video />
          </PlayerComponent>
        </Router>, nodeMock
    ).toJSON();

    expect(videoPlayerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when player mode is "SMALL_SCREEN"`, () => {
    props.playerMode = VideoPlayerMode.SMALL_SCREEN;

    const videoPlayerSnapshot = renderer.create(
        <Router history={history} >
          <PlayerComponent {...props} >
            <video />
          </PlayerComponent>
        </Router>, nodeMock
    ).toJSON();

    expect(videoPlayerSnapshot).toMatchSnapshot();
  });


  it(`Should match with snapshot when player mode is "FULL_SCREEN"`, () => {
    props.playerMode = VideoPlayerMode.FULL_SCREEN;

    const videoPlayerSnapshot = renderer.create(
        <Router history={history} >
          <PlayerComponent {...props} >
            <video />
          </PlayerComponent>
        </Router>, nodeMock
    ).toJSON();

    expect(videoPlayerSnapshot).toMatchSnapshot();
  });
});
