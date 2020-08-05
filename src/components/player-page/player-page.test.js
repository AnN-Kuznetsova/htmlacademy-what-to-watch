import React from "react";
import renderer from "react-test-renderer";

import {PlayerPageComponent} from "./player-page";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


const props = {
  routeProps: {
    match: {
      params: 1}
  },
  movie: mockPromoMovie,
  onOpenPlayerPage: () => {},
  onError: () => {},
  renderVideoPlayer: () => {},
  activePage: ``,
  prevPage: ``,
  progress: 0,
  onChangePage: () => {},
  setPlayerCurrentTime: () => {},
};


describe(`Render PlayerPage`, () => {
  it(`PlayerPage should match with snapshot`, () => {
    const playerPageSnapshot = renderer.create(
        <PlayerPageComponent {...props} />
    ).toJSON();

    expect(playerPageSnapshot).toMatchSnapshot();
  });
});
