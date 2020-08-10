const createMovie = (film) => {
  return {
    id: film[`id`],
    title: film[`name`],
    smallPictureUrl: film[`preview_image`],
    backgroundUrl: film[`background_image`],
    backgroundColor: film[`background_color`],
    posterUrl: film[`poster_image`],
    videoUrl: film[`video_link`],
    previewUrl: film[`preview_video_link`],
    genres: [film[`genre`]],
    releaseDate: new Date(film[`released`], 0),
    description: [film[`description`]],
    directors: [film[`director`]],
    starring: film[`starring`],
    runTime: film[`run_time`],
    reviews: [],
    rating: {
      score: film[`rating`],
      totalVotes: film[`scores_count`],
    },
    isFavorite: film[`is_favorite`],
  };
};

const createMovies = (films) => {
  return films.map((film) => createMovie(film));
};


export {
  createMovie,
  createMovies,
};
