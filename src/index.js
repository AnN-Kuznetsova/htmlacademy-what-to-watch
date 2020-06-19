import React from "react";
import ReactDom from "react-dom";
import {App} from "./components/app/app.jsx";
import {films} from "./mocks/films.js";
import {promoMovie} from "./mocks/promo-movie.js";


ReactDom.render(
    <App
      promoMovie={promoMovie}
      films={films}
    />,
    document.querySelector(`#root`)
);
