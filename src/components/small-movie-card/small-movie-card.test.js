import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {mount} from "enzyme";

import {SmallMovieCard} from "./small-movie-card.jsx";
import {VideoPlayerStatus} from "../../hocs/with-video/with-video.jsx";
import {history} from "../../history";

import {mockMovies} from "../../__test-data__/test-mocks.js";


const props = {
  movie: mockMovies[1],
  onClick: () => {},
  onHover: () => {},
  renderVideoPlayer: () => {},
  currentVideoPlayerStatus: VideoPlayerStatus.ON_PAUSE,
  setVideoPlayerStatus: () => {},
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
