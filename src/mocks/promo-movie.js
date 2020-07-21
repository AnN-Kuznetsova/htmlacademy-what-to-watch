import {reviews} from "./reviews";


export const promoMovie = {
  title: `The Grand Budapest Hotel`,
  smallPictureUrl: `img/player-poster.jpg`,
  backgroundUrl: `img/bg-the-grand-budapest-hotel.jpg`,
  posterUrl: `img/the-grand-budapest-hotel-poster.jpg`,
  previewUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genres: [`Drama`, `Comedy`],
  releaseDate: new Date(2014, 0),
  description: [
    `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy,
    becomes Gustave's friend and protege.`,
    `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay
    there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  ],
  directors: [`Wes Andreson`],
  starring: [`Bill Murray`,
    `Edward Norton`,
    `Jude Law`,
    `Willem Dafoe`,
    `Saoirse Ronan`,
    `Tony Revoloru`,
    `Tilda Swinton`,
    `Tom Wilkinson`,
    `Owen Wilkinson`,
    `Adrien Brody`,
    `Ralph Fiennes`,
    `Jeff Goldblum`,
  ],
  runTime: 99,
  reviews,
  rating: {
    score: 8.9,
    totalVotes: 240,
  },
};
