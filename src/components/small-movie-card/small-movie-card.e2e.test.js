import React from "react";
import {SmallMovieCard} from "./small-movie-card.jsx";
import {shallow} from "enzyme";
import {films, VideoPlayerStatus} from "../../__test-data__/test-mocks.js";


const mockEvent = {
  preventDefault() {}
};

const onClick = jest.fn();
const onHover = jest.fn();
let renderVideoPlayer = null;
let setVideoPlayerStatus = null;

const props = {
  movie: films[1],
  onClick,
  onHover,
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


  it(`Should card be pressed`, () => {
    smallMovieCardElement.simulate(`click`, mockEvent);

    expect(onClick).toHaveBeenCalled();
  });


  it(`Should card be hover and pass to the callback the movie data from which was created`, () => {
    smallMovieCardElement.simulate(`mouseEnter`, mockEvent);

    expect(onHover).toHaveBeenCalled();
    expect(onHover.mock.calls[0][0]).toMatchObject(props.movie);
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


  it(`Should mouse leave the card in less than 1 second`, () => {
    smallMovieCardElement.simulate(`mouseEnter`, mockEvent);
    jest.runTimersToTime(500);
    smallMovieCardElement.simulate(`mouseLeave`);

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(setVideoPlayerStatus).not.toHaveBeenCalled();
  });


  it(`Should mouse leave the card after more than 1 second`, () => {
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
    expect(renderVideoPlayer.mock.calls[0]).toEqual([films[1].previewUrl, films[1].smallPictureUrl, `preview`]);
  });
});
