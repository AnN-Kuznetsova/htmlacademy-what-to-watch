import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";

import {AppRoute} from "../../const";
import {Header} from "../header/header";
import {ListButton} from "../list-button/list-button";
import {MoviePropType} from "../../prop-types";
import {VideoPlayerMode} from "../../hocs/with-video/with-video";
import {withVideoPlayer} from "../../hocs/with-video-player/with-video-player";


const MovieCardPromo = (props) => {
  const {
    movie,
    renderVideoPlayer,
    isPlayerVisible,
    onPlayButtonClick,
  } = props;

  return (
    <section
      className="movie-card"
      style={isPlayerVisible ? {backgroundColor: `#180202`} : {backgroundColor: movie.backgroundColor}}
    >
      {!isPlayerVisible &&
        <div className="movie-card__bg">
          <img src={movie.backgroundUrl} alt={movie.title} />
        </div>}

      <Header />

      <div className="movie-card__wrap">
        {isPlayerVisible && renderVideoPlayer(movie.videoUrl, movie.smallPictureUrl) ||

        <div className="movie-card__info">
          <Link
            to={AppRoute.FILM.replace(`:id`, movie.id)}
          >
            <div className="movie-card__poster">
              <img src={movie.posterUrl} alt={movie.title} width="218" height="327" />
            </div>
          </Link>
          <div className="movie-card__desc">
            <Link
              style={{textDecoration: `none`, color: `inherit`}}
              to={AppRoute.FILM.replace(`:id`, movie.id)}
            >
              <h2 className="movie-card__title">{movie.title}</h2>
            </Link>
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

              <ListButton />
            </div>
          </div>
        </div>}
      </div>
    </section>
  );
};


MovieCardPromo.propTypes = {
  movie: MoviePropType.isRequired,
  renderVideoPlayer: PropTypes.func.isRequired,
  isPlayerVisible: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};


const MovieCardPromoWithPlayer = withVideoPlayer(MovieCardPromo, VideoPlayerMode.SMALL_SCREEN);


export {
  MovieCardPromo,
  MovieCardPromoWithPlayer,
};
