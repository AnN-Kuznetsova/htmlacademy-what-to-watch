
import * as React from "react";
import * as renderer from "react-test-renderer";
import {mount} from 'enzyme';

import {withVideo, VideoPlayerMode, VideoPlayerStatus} from "./with-video";
import {noop} from "../../utils/utils";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


const MockPlayer = (props: MockPlayerProps) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

interface MockPlayerProps {
  children: React.ReactNode | React.ReactNode[];
}

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const props = {
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  posterUrl: `poster-url`,
  playerMode: null,
  activeMovie: mockPromoMovie,
  activePage: ``,
  prevPage: ``,
  onChangePage: noop,
  setVideoPlayerMode: noop,
  setVideoPlayerStatus: noop,
  playerStatus: VideoPlayerStatus.ON_AUTOPLAY,
};

const PlayerWithVideo = withVideo(MockPlayer);


describe(`Render withVideo`, () => {
  describe(`when player mode is "PREVIEW"`, () => {
    props.playerMode = VideoPlayerMode.PREVIEW;


    it(`Should match with snapshot`, () => {
      const playerWithVideoSnapshot = renderer.create(
          <PlayerWithVideo {...props} />, nodeMock
      ).toJSON();

      expect(playerWithVideoSnapshot).toMatchSnapshot();
    });


    it(`Should render correct video props`, () => {
      const playerWithVideoElement = mount(<PlayerWithVideo {...props} />);
      const videoElement = playerWithVideoElement.find(`video`);

      expect([...videoElement][0].ref.current.src).toEqual(props.src);
      expect([...videoElement][0].props.poster).toEqual(props.posterUrl);
      expect([...videoElement][0].props.autoPlay).toEqual(false);
      expect([...videoElement][0].ref.current.muted).toEqual(true);
    });
  });
});
