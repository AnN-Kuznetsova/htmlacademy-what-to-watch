import PropTypes from "prop-types";
import React from "react";

import {Header} from "../header/header";
import {MovieCardInfoWithTabs} from "../movie-card-info/movie-card-info";
import {MoviePropType} from "../../prop-types";
import {VideoPlayerMode} from "../../hocs/with-video/with-video";
import {withVideoPlayer} from "../../hocs/with-video-player/with-video-player";


const MovieCardFull = (props) => {
  const {
    movie,
    renderVideoPlayer,
    isPlayerVisible,
    onPlayButtonClick,
  } = props;

  return (
    <section
      className={`movie-card ${isPlayerVisible || `movie-card--full`}`}
      style={isPlayerVisible ? {backgroundColor: `#180202`} : {backgroundColor: movie.backgroundColor}}
    >
      <div className="movie-card__hero">
        {!isPlayerVisible &&
          <div className="movie-card__bg">
            <img src={movie.backgroundUrl} alt={movie.title} />
          </div>}

        <Header />

        <div className="movie-card__wrap">
          {isPlayerVisible && renderVideoPlayer(movie.videoUrl, movie.smallPictureUrl) ||

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movie.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movie.genres[0]}</span>
                <span className="movie-card__year">{movie.releaseDate.getFullYear()}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={onPlayButtonClick}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
                <a href="add-review.html" className="btn movie-card__button">Add review</a>
              </div>
            </div>}
        </div>
      </div>

      {isPlayerVisible || <MovieCardInfoWithTabs movie={movie} />}
    </section>
  );
};


MovieCardFull.propTypes = {
  movie: MoviePropType.isRequired,
  renderVideoPlayer: PropTypes.func.isRequired,
  isPlayerVisible: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};


const MovieCardFullWithPlayer = withVideoPlayer(MovieCardFull, VideoPlayerMode.SMALL_SCREEN);


export {
  MovieCardFull,
  MovieCardFullWithPlayer,
};
