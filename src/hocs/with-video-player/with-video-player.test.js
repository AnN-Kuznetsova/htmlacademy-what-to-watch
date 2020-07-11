import React from "react";
import renderer from "react-test-renderer";

import {withVideoPlayer} from "./with-video-player";


const Component = (props) => {
  return (
    <div {...props} />
  );
};

const ComponentWithVideoPlayer = withVideoPlayer(Component);


describe(`Render withVideoPlayer`, () => {
  it(`Should match with snapshot`, () => {
    const withVideoPlayerSnapshot = renderer.create(
        <ComponentWithVideoPlayer />
    ).toJSON();

    expect(withVideoPlayerSnapshot).toMatchSnapshot();
  });
});
