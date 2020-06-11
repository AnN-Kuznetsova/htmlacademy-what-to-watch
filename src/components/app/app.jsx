import React from "react";
import MainPage from "../main-page/main-page.jsx";


const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {promoMovie} = props;

  return (
    <MainPage promoMovie={promoMovie} />
  );
};


export default App;
