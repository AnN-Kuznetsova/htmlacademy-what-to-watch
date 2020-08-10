enum PageType {
  MAIN = `main`,
  MOVIE_DETAILS = `movie-details`,
  PLAYER = `player`,
  ERROR = `error`,
  SIGN_IN = `sign-in`,
  ADD_REVIEW = `add-review`,
  MY_LIST = `MY_LIST`,
};

interface MovieType {
  id: number,
  title: string,
  smallPictureUrl: string,
  backgroundUrl: string,
  backgroundColor: string,
  posterUrl: string,
  videoUrl: string,
  previewUrl: string,
  genres: string[],
  releaseDate: Date,
  description: string[],
  directors: string[],
  starring: string[],
  runTime: number,
  reviews: [],
  rating: {
    score: number,
    totalVotes: number,
  },
  isFavorite: boolean,
};

interface ReviewType {
  text: string,
  rating: number,
  author: string,
  date: Date,
};


export {
  PageType,
  MovieType,
  ReviewType,
};
