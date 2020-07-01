import React from "react";
import renderer from "react-test-renderer";
import {withVideoPlayer} from "./with-video-player";


const Component = (props) => {
  return (
    <div {...props} />
  );
};


describe(`Render withVideoPlayer`, () => {
  it(`Should match with snapshot`, () => {
    const withVideoPlayerSnapshot = renderer.create(
        <withVideoPlayer Component={Component} />
    ).toJSON();

    expect(withVideoPlayerSnapshot).toMatchSnapshot();
  });
});
