import PropTypes from "prop-types";
import React from "react";

import {Header} from "../header/header";
import {MoviePropType} from "../../prop-types";
import {VideoPlayerMode} from "../../hocs/with-video/with-video";
import {withVideoPlayer} from "../../hocs/with-video-player/with-video-player";


const MovieCardPromo = (props) => {
  const {
    movie,
    onMovieClick,
    renderVideoPlayer,
    isPlayerVisible,
    onPlayButtonClick,
  } = props;

  return (
    <section
      className="movie-card"
      style={isPlayerVisible ? {backgroundColor: `#180202`} : {}}
    >
      {isPlayerVisible && renderVideoPlayer(movie.previewUrl, movie.smallPictureUrl)
      ||
      <React.Fragment>
        <div className="movie-card__bg">
          <img src={movie.backgroundUrl} alt={movie.title} />
        </div>

        <Header />

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster" onClick={onMovieClick}>
              <img src={movie.posterUrl} alt={movie.title} width="218" height="327" />
            </div>
            <div className="movie-card__desc">
              <h2
                className="movie-card__title"
                onClick={onMovieClick}
              >
                {movie.title}
              </h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movie.genres[0]}</span>
                <span className="movie-card__year">{movie.releaseDate.getFullYear()}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button"
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
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>}
    </section>
  );
};


MovieCardPromo.propTypes = {
  movie: MoviePropType.isRequired,
  onMovieClick: PropTypes.func.isRequired,
  renderVideoPlayer: PropTypes.func.isRequired,
  isPlayerVisible: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};


const MovieCardPromoWithPlayer = withVideoPlayer(MovieCardPromo, VideoPlayerMode.SMALL_SCREEN);


export {
  MovieCardPromo,
  MovieCardPromoWithPlayer,
};
