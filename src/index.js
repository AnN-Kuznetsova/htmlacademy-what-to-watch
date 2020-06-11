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


ReactDom.render(
    <App promoMovie={promoMovie} />,
    document.querySelector(`#root`)
);
