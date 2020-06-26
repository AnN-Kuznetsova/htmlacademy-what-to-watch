import React from "react";
import renderer from "react-test-renderer";
import {MovieCard} from "./movie-card.jsx";
import {PageType} from "../../const.js";
import {getLimitedNumberOfArrayElementsToString} from "../../utils/utils.js";
import {promoMovie} from "../../__test-data__/test-mocks.js";
import {shallow} from "enzyme";


const NUMBER_OF_ELEMENTS_IN_LINE = 4;

const props = {
  movie: promoMovie,
  activePage: PageType.MAIN_INDEX,
  onMovieClick: () => {},
};


describe(`Render MovieCard when ative page is MAIN_INDEX`, () => {
  const movieCardElement = shallow(<MovieCard {...props} />);


  it(`Should match with snapshot`, () => {
    const movieCardSnapshot = renderer.create(
        <MovieCard {...props} />
    ).toJSON();

    expect(movieCardSnapshot).toMatchSnapshot();
  });


  it(`Should render correct promo-movie title`, () => {
    expect(movieCardElement.find(`div.movie-card__bg img`).prop(`alt`))
      .toEqual(promoMovie.title);

    expect(movieCardElement.find(`div.movie-card__poster img`).prop(`alt`))
      .toEqual(promoMovie.title);

    expect(movieCardElement.find(`h2.movie-card__title`).text())
      .toEqual(promoMovie.title);
  });


  it(`Should render correct promo-movie genre`, () => {
    expect(movieCardElement.find(`span.movie-card__genre`).text())
      .toEqual(promoMovie.genres[0]);
  });


  it(`Should render correct promo-movie release date`, () => {
    expect(movieCardElement.find(`span.movie-card__year`).text())
      .toEqual(promoMovie.releaseDate.getFullYear().toString());
  });


  it(`Should render correct promo-movie poster`, () => {
    expect(movieCardElement.find(`div.movie-card__poster img`).prop(`src`))
      .toEqual(promoMovie.posterUrl);
  });


  it(`Should render correct movie card background`, () => {
    expect(movieCardElement.find(`div.movie-card__bg img`).prop(`src`))
      .toEqual(promoMovie.backgroundUrl);
  });
});


describe(`Render MovieCard when active page is MAIN_MOVIE_DETAILS`, () => {
  props.activePage = PageType.MAIN_MOVIE_DETAILS;

  const movieCardElement = shallow(<MovieCard {...props} />);


  it(`Should match with snapshot`, () => {
    const movieCardSnapshot = renderer.create(
        <MovieCard {...props} />
    ).toJSON();

    expect(movieCardSnapshot).toMatchSnapshot();
  });


  it(`Should render correct movie title`, () => {
    expect(movieCardElement.find(`div.movie-card__bg img`).prop(`alt`))
      .toEqual(promoMovie.title);

    expect(movieCardElement.find(`div.movie-card__poster img`).prop(`alt`))
      .toEqual(`${promoMovie.title} poster`);

    expect(movieCardElement.find(`h2.movie-card__title`).text())
      .toEqual(promoMovie.title);
  });


  it(`Should render correct movie genre`, () => {
    expect(movieCardElement.find(`span.movie-card__genre`).text())
      .toEqual(promoMovie.genres[0]);
  });


  it(`Should render correct movie release date`, () => {
    expect(movieCardElement.find(`span.movie-card__year`).text())
      .toEqual(promoMovie.releaseDate.getFullYear().toString());
  });


  it(`Should render correct movie poster`, () => {
    expect(movieCardElement.find(`div.movie-card__poster img`).prop(`src`))
      .toEqual(promoMovie.posterUrl);
  });


  it(`Should render correct movie page background`, () => {
    expect(movieCardElement.find(`div.movie-card__bg img`).prop(`src`))
      .toEqual(promoMovie.backgroundUrl);
  });


  it(`Should render correct movie description`, () => {
    let movieDescriptionElements = movieCardElement.find(`div.movie-card__text p`);

    expect(movieDescriptionElements.length)
      .toEqual(promoMovie.description.length + 2);

    movieDescriptionElements = [...movieDescriptionElements];

    promoMovie.description.forEach((descriptionItem, index) => {
      expect(movieDescriptionElements[index].props.children)
        .toEqual(descriptionItem);
    });
  });


  it(`Should render correct movie directors`, () => {
    expect(movieCardElement.find(`p.movie-card__director strong`).text())
      .toEqual(getLimitedNumberOfArrayElementsToString(promoMovie.directors, NUMBER_OF_ELEMENTS_IN_LINE, `Director: `));
  });


  it(`Should render correct movie starring`, () => {
    expect(movieCardElement.find(`p.movie-card__starring strong`).text())
      .toEqual(getLimitedNumberOfArrayElementsToString(promoMovie.starring, NUMBER_OF_ELEMENTS_IN_LINE, `Starring: `, ` and other`));
  });


  it(`Should render correct movie score`, () => {
    expect(movieCardElement.find(`div.movie-rating__score`).text())
      .toEqual(promoMovie.rating.score.toString().replace(`.`, `,`));
  });


  it(`Should render correct movie total votes`, () => {
    expect(movieCardElement.find(`span.movie-rating__count`).text())
      .toEqual(`${promoMovie.rating.totalVotes} ratings`);
  });


  it(`Should render correct movie rating description`, () => {
    expect(movieCardElement.find(`span.movie-rating__level`).text())
      .toEqual(`Very good`);
  });
});
