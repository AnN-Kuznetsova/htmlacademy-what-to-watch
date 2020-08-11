import * as React from "react";
import * as renderer from "react-test-renderer";

import {PlayerPageComponent} from "./player-page";
import {noop} from "../../utils/utils";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


const renderNoop = () => {
  return <div />;
};

const props = {
  routeProps: {
    match: {
      params: 1}
  },
  movie: mockPromoMovie,
  onOpenPlayerPage: noop,
  onError: noop,
  renderVideoPlayer: renderNoop,
};


describe(`Render PlayerPage`, () => {
  it(`PlayerPage should match with snapshot`, () => {
    const playerPageSnapshot = renderer.create(
        <PlayerPageComponent {...props} />
    ).toJSON();

    expect(playerPageSnapshot).toMatchSnapshot();
  });
});
