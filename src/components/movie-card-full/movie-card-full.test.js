import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import {MovieCardFull} from "./movie-card-full.jsx";

import {promoMovie} from "../../__test-data__/test-mocks.js";


const props = {
  movie: promoMovie,
};

const movieCardFullElement = shallow(<MovieCardFull {...props} />);


describe(`Render MovieCardFull`, () => {
  it(`Should match with snapshot`, () => {
    const movieCardFulSnapshot = renderer.create(
        <MovieCardFull {...props} />
    ).toJSON();

    expect(movieCardFulSnapshot).toMatchSnapshot();
  });


  it(`Should render correct movie title`, () => {
    expect(movieCardFullElement.find(`div.movie-card__bg img`).prop(`alt`))
      .toEqual(promoMovie.title);

    expect(movieCardFullElement.find(`div.movie-card__poster img`).prop(`alt`))
      .toEqual(`${promoMovie.title} poster`);

    expect(movieCardFullElement.find(`h2.movie-card__title`).text())
      .toEqual(promoMovie.title);
  });


  it(`Should render correct movie genre`, () => {
    expect(movieCardFullElement.find(`span.movie-card__genre`).text())
      .toEqual(promoMovie.genres[0]);
  });


  it(`Should render correct movie release date`, () => {
    expect(movieCardFullElement.find(`span.movie-card__year`).text())
      .toEqual(promoMovie.releaseDate.getFullYear().toString());
  });


  it(`Should render correct movie poster`, () => {
    expect(movieCardFullElement.find(`div.movie-card__poster img`).prop(`src`))
      .toEqual(promoMovie.posterUrl);
  });


  it(`Should render correct movie page background`, () => {
    expect(movieCardFullElement.find(`div.movie-card__bg img`).prop(`src`))
      .toEqual(promoMovie.backgroundUrl);
  });


  it(`Should render correct movie description`, () => {
    let movieDescriptionElements = movieCardFullElement.find(`div.movie-card__text p`);

    expect(movieDescriptionElements.length)
      .toEqual(promoMovie.description.length + 2);

    movieDescriptionElements = [...movieDescriptionElements];

    promoMovie.description.forEach((descriptionItem, index) => {
      expect(movieDescriptionElements[index].props.children)
        .toEqual(descriptionItem);
    });
  });


  it(`Should render correct movie directors`, () => {
    expect(movieCardFullElement.find(`p.movie-card__director strong`).text())
      .toEqual(`Director: Wes Andreson`);
  });


  it(`Should render correct movie starring`, () => {
    expect(movieCardFullElement.find(`p.movie-card__starring strong`).text())
      .toEqual(`Starring: Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other`);
  });


  it(`Should render correct movie score`, () => {
    expect(movieCardFullElement.find(`div.movie-rating__score`).text())
      .toEqual(promoMovie.rating.score.toString().replace(`.`, `,`));
  });


  it(`Should render correct movie total votes`, () => {
    expect(movieCardFullElement.find(`span.movie-rating__count`).text())
      .toEqual(`${promoMovie.rating.totalVotes} ratings`);
  });


  it(`Should render correct movie rating description`, () => {
    expect(movieCardFullElement.find(`span.movie-rating__level`).text())
      .toEqual(`Very good`);
  });
});
