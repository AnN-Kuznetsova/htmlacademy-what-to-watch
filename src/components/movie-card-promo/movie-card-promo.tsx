import * as React from "react";
import {Link} from "react-router-dom";

import {AppRoute} from "../../const";
import {Header} from "../header/header";
import {ListButton} from "../list-button/list-button";
import {MovieType} from "../../types";


interface Props {
  movie: MovieType;
}


export const MovieCardPromo: React.FunctionComponent<Props> = (props: Props) => {
  const {
    movie,
  } = props;

  return (
    <section
      className="movie-card"
      style={{backgroundColor: movie.backgroundColor}}
    >
      <div className="movie-card__bg">
        <img src={movie.backgroundUrl} alt={movie.title} />
      </div>

      <Header />

      <div className="movie-card__wrap">
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
              <Link
                className="btn btn--play movie-card__button"
                to={AppRoute.PLAYER.replace(`:id`, movie.id)}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s" />
                </svg>
                <span>Play</span>
              </Link>

              <ListButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
