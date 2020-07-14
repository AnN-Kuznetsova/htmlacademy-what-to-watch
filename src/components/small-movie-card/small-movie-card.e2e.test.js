import React from "react";
import {shallow} from "enzyme";

import {SmallMovieCard} from "./small-movie-card.jsx";

import {mockMovies, VideoPlayerStatus} from "../../__test-data__/test-mocks.js";


const mockEvent = {
  preventDefault() {}
};

const onClick = jest.fn();
let renderVideoPlayer = null;
let setVideoPlayerStatus = null;

const props = {
  movie: mockMovies[1],
  onClick,
  renderVideoPlayer,
  currentVideoPlayerStatus: VideoPlayerStatus.ON_PAUSE,
  setVideoPlayerStatus,
};

let smallMovieCardElement = null;


describe(`SmallMovieCard e2e-tests`, () => {
  beforeEach(() => {
    jest.useFakeTimers();
    renderVideoPlayer = jest.fn();
    setVideoPlayerStatus = jest.fn();
    props.renderVideoPlayer = renderVideoPlayer;
    props.setVideoPlayerStatus = setVideoPlayerStatus;

    smallMovieCardElement = shallow(<SmallMovieCard {...props} />);
  });

  afterEach(() => {
    jest.useRealTimers();
  });


  it(`"onClick" should be called and movie data passed`, () => {
    smallMovieCardElement.simulate(`click`, mockEvent);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toEqual(mockMovies[1]);
  });


  it(`Should set timer and call "setVideoPlayerStatus" after 1 second after hover`, () => {
    smallMovieCardElement.simulate(`mouseEnter`, mockEvent);

    expect(setTimeout).toHaveBeenCalledTimes(1);

    jest.runTimersToTime(500);
    expect(setVideoPlayerStatus).not.toHaveBeenCalled();

    jest.runTimersToTime(1000);
    expect(setVideoPlayerStatus).toHaveBeenCalled();
    expect(setVideoPlayerStatus.mock.calls[0][0]).toEqual(VideoPlayerStatus.ON_PLAY);
  });


  it(`Mouse leave in less than 1 second`, () => {
    smallMovieCardElement.simulate(`mouseEnter`, mockEvent);
    jest.runTimersToTime(500);
    smallMovieCardElement.simulate(`mouseLeave`);

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(setVideoPlayerStatus).not.toHaveBeenCalled();
  });


  it(`Mouse leave in more than 1 second`, () => {
    props.currentVideoPlayerStatus = VideoPlayerStatus.ON_PLAY;
    smallMovieCardElement = shallow(<SmallMovieCard {...props} />);

    smallMovieCardElement.simulate(`mouseEnter`, mockEvent);
    jest.runTimersToTime(2000);
    smallMovieCardElement.simulate(`mouseLeave`);

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(setVideoPlayerStatus).toHaveBeenCalledTimes(2);
    expect(setVideoPlayerStatus.mock.calls[1][0]).toEqual(VideoPlayerStatus.ON_PAUSE);
  });


  it(`Should pass the correct data when calling "renderVideoPlayer"`, () => {
    expect(renderVideoPlayer).toHaveBeenCalledTimes(1);
    expect(renderVideoPlayer.mock.calls[0])
      .toEqual([mockMovies[1].previewUrl, mockMovies[1].smallPictureUrl, `preview`]);
  });
});
