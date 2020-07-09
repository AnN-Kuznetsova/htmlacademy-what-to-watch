import PropTypes from "prop-types";
import React from "react";
import {GenresItem} from "../genres-item/genres-item.jsx";
import {MoviePropType} from "../../prop-types.js";
import {PageType} from "../../const.js";
import {SmallMovieCard} from "../small-movie-card/small-movie-card.jsx";
import {ShowMoreButton} from "../show-more-button/show-more-button.jsx";
import {genreNames} from "../../mocks/genre-names.js";
import {withVideoPlayer} from "../../hocs/with-video-player/with-video-player.jsx";


const SmallMovieCardWithVideoPlayer = withVideoPlayer(SmallMovieCard);

export const Catalog = (props) => {
  const {
    films,
    activePage,
    onSmallMovieCardClick
  } = props;
  const isMainPage = activePage === PageType.MAIN_INDEX;
  const isMovieDetailsPage = activePage === PageType.MAIN_MOVIE_DETAILS;

  const handleGenreClick = () => {};

  const handleSmallMovieCardClick = (newActiveMovie) => {
    onSmallMovieCardClick(newActiveMovie);
  };

  const handleShowMoreButtonClick = () => {};

  return (
    <section className={`catalog ${isMovieDetailsPage ? `catalog--like-this` : ``}`}>
      <h2 className={`catalog__title ${isMainPage ? `visually-hidden` : ``}`}>
        {isMovieDetailsPage ? `More like this` : `Catalog`}
      </h2>

      {isMainPage &&
        <ul className="catalog__genres-list">
          {
            genreNames.map((genreName, index) =>
              <GenresItem
                key={genreName + index}
                genreName={genreName}
                onClick={handleGenreClick}
              />
            )
          }
        </ul>}

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

      {isMainPage && <ShowMoreButton onClick={handleShowMoreButtonClick} />}
    </section>
  );
};


Catalog.propTypes = {
  films: PropTypes.arrayOf(MoviePropType).isRequired,
  activePage: PropTypes.string.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
};
