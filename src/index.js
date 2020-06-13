import React from "react";
import ReactDom from "react-dom";
import {App} from "./components/app/app.jsx";


const promoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: new Date(2014, 0),
  posterUrl: `img/the-grand-budapest-hotel-poster.jpg`,
  backgroundUrl: `img/bg-the-grand-budapest-hotel.jpg`,
};

const movieTitles = [
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
];


ReactDom.render(
    <App promoMovie={promoMovie} movieTitles={movieTitles} />,
    document.querySelector(`#root`)
);
