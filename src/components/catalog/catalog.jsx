import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {GenresItem} from "../genres-item/genres-item.jsx";
import {MoviePropType} from "../../prop-types.js";
import {ShowMoreButton} from "../show-more-button/show-more-button.jsx";
import {SmallMovieCard} from "../small-movie-card/small-movie-card.jsx";
import {genreNames} from "../../mocks/genre-names.js";


export class Catalog extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovie: null,
    };

    this.handleSmallMovieCardHover = this.handleSmallMovieCardHover.bind(this);
  }

  handleGenreClick() {}

  handleSmallMovieCardClick() {}

  handleSmallMovieCardHover(movie) {
    this.setState({
      activeMovie: movie
    });
  }

  handleShowMoreButtonClick() {}

  render() {
    const {films} = this.props;

    return (
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <ul className="catalog__genres-list">
          {
            genreNames.map((genreName, index) =>
              <GenresItem
                key={genreName + index}
                genreName={genreName}
                onClick={this.handleGenreClick}
              />
            )
          }
        </ul>

        <div className="catalog__movies-list">
          {
            films.map((movie, index) =>
              <SmallMovieCard
                key={movie + index}
                movie={movie}
                onClick={this.handleSmallMovieCardClick}
                onHover={this.handleSmallMovieCardHover}
              />
            )
          }
        </div>

        <ShowMoreButton onClick={this.handleShowMoreButtonClick} />
      </section>
    );
  }
}


Catalog.propTypes = {
  films: PropTypes.arrayOf(MoviePropType).isRequired,
};
