import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {mount} from "enzyme";

import {SmallMovieCard} from "./small-movie-card";
import {VideoPlayerStatus} from "../../hocs/with-video/with-video";
import {history} from "../../history";
import {noop} from "../../utils/utils";

import {mockMovies} from "../../__test-data__/test-mocks";


const renderNoop = () => {
  return <div />;
};

const props = {
  movie: mockMovies[1],
  renderVideoPlayer: renderNoop,
  currentVideoPlayerStatus: VideoPlayerStatus.ON_PAUSE,
  setVideoPlayerStatus: noop,
};

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const smallMovieCardElement = mount(
    <Router history={history} >
      <SmallMovieCard {...props} />
    </Router>
);


describe(`Render SmallMovieCard`, () => {
  it(`Should match with snapshot`, () => {
    const smallMovieCardSnapshot = renderer.create(
        <Router history={history} >
          <SmallMovieCard {...props} />
        </Router>, nodeMock
    ).toJSON();

    expect(smallMovieCardSnapshot).toMatchSnapshot();
  });


  it(`Should render correct movie title`, () => {
    expect(smallMovieCardElement.find(`.small-movie-card__link`).at(0).text())
      .toEqual(props.movie.title);

    expect(smallMovieCardElement.find(`div.small-movie-card__image img`).prop(`alt`))
      .toEqual(props.movie.title);
  });


  it(`Should render correct small picture url`, () => {
    expect(smallMovieCardElement.find(`div.small-movie-card__image img`).prop(`src`))
      .toEqual(props.movie.smallPictureUrl);
  });
});
