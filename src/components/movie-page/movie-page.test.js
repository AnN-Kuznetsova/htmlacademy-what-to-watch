import React from "react";
import renderer from "react-test-renderer";
import {MoviePage} from "./movie-page.jsx";
import {getLimitedNumberOfArrayElementsToString} from "../../utils/utils.js";
import {promoMovie, films} from "../../__test-data__/test-mocks.js";
import {mount} from "enzyme";


const NUMBER_OF_ELEMENTS_IN_LINE = 4;

const props = {
  currentMovie: promoMovie,
  films,
  onSmallMovieCardHover: () => {},
  onSmallMovieCardClick: () => {},
};

const moviePageElement = mount(<MoviePage {...props} />);


describe(`Render MoviePage`, () => {
  it(`Should match with snapshot`, () => {
    const moviePageSnapshot = renderer.create(
        <MoviePage {...props} />
    ).toJSON();

    expect(moviePageSnapshot).toMatchSnapshot();
  });


  it(`Should render correct movie title`, () => {
    expect(moviePageElement.find(`div.movie-card__bg img`).prop(`alt`))
      .toEqual(promoMovie.title);

    expect(moviePageElement.find(`div.movie-card__poster img`).prop(`alt`))
      .toEqual(`${promoMovie.title} poster`);

    expect(moviePageElement.find(`h2.movie-card__title`).text())
      .toEqual(promoMovie.title);
  });


  it(`Should render correct movie genre`, () => {
    expect(moviePageElement.find(`span.movie-card__genre`).text())
      .toEqual(promoMovie.genres[0]);
  });


  it(`Should render correct movie release date`, () => {
    expect(moviePageElement.find(`span.movie-card__year`).text())
      .toEqual(promoMovie.releaseDate.getFullYear().toString());
  });


  it(`Should render correct movie poster`, () => {
    expect(moviePageElement.find(`div.movie-card__poster img`).prop(`src`))
      .toEqual(promoMovie.posterUrl);
  });


  it(`Should render correct movie page background`, () => {
    expect(moviePageElement.find(`div.movie-card__bg img`).prop(`src`))
      .toEqual(promoMovie.backgroundUrl);
  });


  it(`Should render correct movie description`, () => {
    let movieDescriptionElements = moviePageElement.find(`div.movie-card__text p`);

    expect(movieDescriptionElements.length)
      .toEqual(promoMovie.description.length + 2);

    movieDescriptionElements = [...movieDescriptionElements];

    promoMovie.description.forEach((descriptionItem, index) => {
      expect(movieDescriptionElements[index].props.children)
        .toEqual(descriptionItem);
    });
  });


  it(`Should render correct movie directors`, () => {
    expect(moviePageElement.find(`p.movie-card__director strong`).text())
      .toEqual(getLimitedNumberOfArrayElementsToString(promoMovie.directors, NUMBER_OF_ELEMENTS_IN_LINE, `Director: `));
  });


  it(`Should render correct movie starring`, () => {
    expect(moviePageElement.find(`p.movie-card__starring strong`).text())
      .toEqual(getLimitedNumberOfArrayElementsToString(promoMovie.starring, NUMBER_OF_ELEMENTS_IN_LINE, `Starring: `, ` and other`));
  });


  it(`Should render correct movie score`, () => {
    expect(moviePageElement.find(`div.movie-rating__score`).text())
      .toEqual(promoMovie.rating.score.toString().replace(`.`, `,`));
  });


  it(`Should render correct movie total votes`, () => {
    expect(moviePageElement.find(`span.movie-rating__count`).text())
      .toEqual(`${promoMovie.rating.totalVotes} ratings`);
  });


  it(`Should render correct movie rating description`, () => {
    expect(moviePageElement.find(`span.movie-rating__level`).text())
      .toEqual(`Very good`);
  });
});
