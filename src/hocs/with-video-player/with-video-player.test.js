import * as React from "react";
import renderer from "react-test-renderer";

import {withVideoPlayer} from "./with-video-player";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


const MockComponent = (props) => {
  return (
    <div {...props} />
  );
};

const ComponentWithVideoPlayer = withVideoPlayer(MockComponent);


describe(`Render withVideoPlayer`, () => {
  it(`Should match with snapshot`, () => {
    const withVideoPlayerSnapshot = renderer.create(
        <ComponentWithVideoPlayer movie={mockPromoMovie} />
    ).toJSON();

    expect(withVideoPlayerSnapshot).toMatchSnapshot();
  });
});
