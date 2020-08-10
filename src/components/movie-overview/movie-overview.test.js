import * as React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import {MovieOverview} from "./movie-overview";

import {mockPromoMovie} from "../../__test-data__/test-mocks";


const movieOverviewElement = shallow(<MovieOverview movie={mockPromoMovie} />);


describe(`Render MovieOverview`, () => {
  it(`Should match with snapshot`, () => {
    const movieOverviewSnapshot = renderer.create(
        <MovieOverview movie={mockPromoMovie} />
    ).toJSON();

    expect(movieOverviewSnapshot).toMatchSnapshot();
  });


  it(`Should render correct movie description`, () => {
    let movieDescriptionElements = movieOverviewElement.find(`div.movie-card__text p`);

    expect(movieDescriptionElements.length)
      .toEqual(mockPromoMovie.description.length + 2);

    movieDescriptionElements = [...movieDescriptionElements];

    mockPromoMovie.description.forEach((descriptionItem, index) => {
      expect(movieDescriptionElements[index].props.children)
        .toEqual(descriptionItem);
    });
  });


  it(`Should render correct movie directors`, () => {
    expect(movieOverviewElement.find(`p.movie-card__director strong`).text())
      .toEqual(`Director: Wes Andreson`);
  });


  it(`Should render correct movie starring`, () => {
    expect(movieOverviewElement.find(`p.movie-card__starring strong`).text())
      .toEqual(`Starring: Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other`);
  });


  it(`Should render correct movie score`, () => {
    expect(movieOverviewElement.find(`div.movie-rating__score`).text())
      .toEqual(mockPromoMovie.rating.score.toString().replace(`.`, `,`));
  });


  it(`Should render correct movie total votes`, () => {
    expect(movieOverviewElement.find(`span.movie-rating__count`).text())
      .toEqual(`${mockPromoMovie.rating.totalVotes} ratings`);
  });


  it(`Should render correct movie rating description`, () => {
    expect(movieOverviewElement.find(`span.movie-rating__level`).text())
      .toEqual(`Very good`);
  });
});
