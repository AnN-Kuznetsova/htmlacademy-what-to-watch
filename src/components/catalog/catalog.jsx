import PropTypes from "prop-types";
import React from "react";
import {NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP} from "../../const.js";
import {MoviePropType} from "../../prop-types.js";
import {SmallMovieCard} from "../small-movie-card/small-movie-card.jsx";
import {ShowMoreButton} from "../show-more-button/show-more-button.jsx";
import {genreNames} from "../../mocks/genre-names.js";
import {withVideoPlayer} from "../../hocs/with-video-player/with-video-player.jsx";


const SmallMovieCardWithVideoPlayer = withVideoPlayer(SmallMovieCard);


export const Catalog = (props) => {
  const {
    films,
    onSmallMovieCardClick,
    renderFilter,
  } = props;

  const handleSmallMovieCardClick = (newActiveMovie) => {
    onSmallMovieCardClick(newActiveMovie);
  };

  const handleShowMoreButtonClick = () => {};

  return (
    <React.Fragment>
      {renderFilter && renderFilter(genreNames)}

      <div className="catalog__movies-list">
        {
          films.map((movie, index) =>
            <SmallMovieCardWithVideoPlayer
              key={movie.title + index}
              movie={movie}
              onClick={handleSmallMovieCardClick}
            />
          )
        }
      </div>

      {
        (films.length > NUMBER_OF_CARDS_IN_CATALOG_AT_STARTUP) &&
        <ShowMoreButton onClick={handleShowMoreButtonClick} />
      }
    </React.Fragment>
  );
};


Catalog.propTypes = {
  films: PropTypes.arrayOf(MoviePropType).isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
  renderFilter: PropTypes.func,
};
