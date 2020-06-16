import React from "react";
import renderer from "react-test-renderer";
import {MainPage} from "./main-page.jsx";


const props = {
  promoMovie: {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    releaseDate: new Date(2014, 0),
    posterUrl: `img/the-grand-budapest-hotel-poster.jpg`,
    backgroundUrl: `img/bg-the-grand-budapest-hotel.jpg`,
  },
  movieTitles: [
    `Fantastic Beasts: The Crimes of Grindelwald`,
    `Bohemian Rhapsody`,
    `Macbeth`,
    `Aviator`,
    `We need to talk about Kevin`,
    `What We Do in the Shadows`,
    `Revenant`,
    `Johnny English`,
    `Shutter Island`,
    `Pulp Fiction`,
    `No Country for Old Men`,
    `Snatch`,
    `Moonrise Kingdom`,
    `Seven Years in Tibet`,
    `Midnight Special`,
    `War of the Worlds`,
    `Dardjeeling Limited`,
    `Orlando`,
    `Mindhunter`,
    `Midnight Special`,
  ],
};


describe(`Render MainPage`, () => {
  it(`Should match with snapshot`, () => {
    const mainPageSnapshot = renderer.create(
        <MainPage {...props} />
    ).toJSON();

    expect(mainPageSnapshot).toMatchSnapshot();
  });
});
