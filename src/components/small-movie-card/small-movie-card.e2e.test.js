import React from "react";
import {shallow} from "enzyme";
import {SmallMovieCard} from "./small-movie-card.jsx";
import {films} from "../../__test-data__/test-mocks.js";


const mockEvent = {
  preventDefault() {}
};

const onClick = jest.fn();
const onHover = jest.fn();

const props = {
  movie: films[1],
  onClick,
  onHover,
  renderVideoPlayer: () => {},
  setVideoPlayerStatus: () => {},
};

const smallMovieCardElement = shallow(<SmallMovieCard {...props} />);


describe(`SmallMovieCard e2e-tests`, () => {
  it(`Should card be pressed`, () => {
    smallMovieCardElement.simulate(`click`, mockEvent);

    expect(onClick).toHaveBeenCalled();
  });


  it(`Should card be hover and pass to the callback the movie data from which was created`, () => {
    smallMovieCardElement.simulate(`mouseEnter`, mockEvent);

    expect(onHover).toHaveBeenCalled();
    expect(onHover.mock.calls[0][0]).toMatchObject(props.movie);
  });
});
