const mockVideoUrl = `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`;

const mockPromoMovie = {
  id: 1,
  title: `The Grand Budapest Hotel`,
  smallPictureUrl: ``,
  backgroundUrl: `img/bg-the-grand-budapest-hotel.jpg`,
  backgroundColor: `black`,
  posterUrl: `img/the-grand-budapest-hotel-poster.jpg`,
  videoUrl: mockVideoUrl,
  previewUrl: mockVideoUrl,
  genres: [`Drama`, `Comedy`],
  releaseDate: new Date(`Wed Jan 01 2014 00:00:00 GMT+0`),
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
  reviews: [],
  rating: {
    score: 8.9,
    totalVotes: 240,
  },
  isFavorite: false,
};

const mockMovies = [
  {
    id: 2,
    title: `Bohemian Rhapsody`,
    smallPictureUrl: `img/bohemian-rhapsody.jpg`,
    backgroundUrl: `img/bohemian-rhapsody.jpg`,
    backgroundColor: `black`,
    posterUrl: `img/bohemian-rhapsody.jpg`,
    videoUrl: mockVideoUrl,
    previewUrl: mockVideoUrl,
    genres: [`Drama`, `Biography`, `Crime`, `Detective`, `Military`, `History`],
    releaseDate: new Date(2018, 0),
    description: [
      `Сюжет картины охватывает период 1970—1985 года, рассказывая о жизни, творчестве и отношениях внутри группы Queen, а также о личной жизни фронтмена
      группы — Фредди Меркьюри.`,
      `В 1970 году Фаррух Булсара, студент-дизайнер и грузчик багажа в аэропорту, посещает концерт группы Smile. После шоу Фаррух встречается с членами
      группы и узнаёт, что группу только что покинул вокалист. Недолго думая, он предлагает себя в качестве нового вокалиста, и его предложение было одобрено
      участниками группы — Брайаном Мэем и Роджером Тейлором. Фаррух берёт себе сценический псевдоним Фредди Меркьюри. Новый коллектив с подачи Фредди получает
      название Queen и начинает гастрольную деятельность по Великобритании. `
    ],
    directors: [
      `Брайан Сингер`,
      `Декстер Флетчер`,
    ],
    starring: [
      `Рами Малек`,
      `Люси Бойнтон`,
      `Гвилим Ли`,
      `Бен Харди`,
      `Джозеф Маццелло`,
      `Эйдан Гиллен`,
      `Том Холландер`,
      `Аллен Лич`,
      `Майк Майерс`,
    ],
    runTime: 134,
    reviews: [],
    rating: {
      score: 8.0,
      totalVotes: 350,
    },
    isFavorite: true,
  },

  {
    id: 3,
    title: `Aviator`,
    smallPictureUrl: `img/aviator.jpg`,
    backgroundUrl: `img/aviator.jpg`,
    backgroundColor: `black`,
    posterUrl: `img/aviator.jpg`,
    videoUrl: mockVideoUrl,
    previewUrl: mockVideoUrl,
    genres: [`Drama`, `Biography`, `Fiction`, `Thriller`],
    releaseDate: new Date(2004, 0),
    description: [
      `Получив от отца небольшую фабрику, Говард Хьюз превратил ее в гигантское, фантастически прибыльное предприятие. Став владельцем огромной кинокомпании,
      он снял самый дорогой для своего времени фильм и покорил сердца прелестнейших голливудских актрис.`,
      `Ему принадлежали самые престижные казино Лас-Вегаса и он установил рекорд скоростных полетов, приобрел вторую по величине коммерческую авиакомпанию…`
    ],
    directors: [`Мартин Скорсезе`],
    starring: [
      `Леонардо ДиКаприо`,
      `Кейт Бланшетт`,
      `Мэтт Росс`,
      `Джон Си Райли`,
      `Алан Алда`,
      `Кейт Бекинсейл`,
      `Алек Болдуин`,
      `Иэн Холм`,
      `Адам Скотт`,
      `Дэнни Хьюстон`,
    ],
    runTime: 163,
    reviews: [],
    rating: {
      score: 7.6,
      totalVotes: 120,
    },
    isFavorite: false,
  },

  {
    id: 4,
    title: `Revenant`,
    smallPictureUrl: `img/revenant.jpg`,
    backgroundUrl: `img/revenant.jpg`,
    backgroundColor: `black`,
    posterUrl: `img/revenant.jpg`,
    videoUrl: mockVideoUrl,
    previewUrl: mockVideoUrl,
    genres: [`Drama`, `Biography`, `Adventure`, `Western`, `Action`],
    releaseDate: new Date(2015, 0),
    description: [
      `Охотник Хью Гласс серьезно ранен на неизведанных просторах американского Дикого Запада. Товарищ Хью по отряду покорителей новых земель Джон Фицжеральд
      предательски оставляет его умирать в одиночестве. Теперь у Гласса осталось только одно оружие — его сила воли.`,
      `Он готов бросить вызов первобытной природе, суровой зиме и враждебным племенам индейцев, только чтобы выжить и отомстить Фицжеральду.`,
    ],
    directors: [`Алехандро Гонсалес Иньярриту`],
    starring: [
      `Леонардо ДиКаприо`,
      `Том Харди`,
      `Донал Глисон`,
      `Уилл Поултер`,
      `Форрест Гудлак`,
      `Пол Андерсон`,
      `Кристоффер Йонер`,
      `Джошуа Бёрдж`,
      `Дуан Ховард`,
      `Мила Нахеко`,
    ],
    runTime: 156,
    reviews: [],
    rating: {
      score: 7.8,
      totalVotes: 263,
    },
    isFavorite: true,
  },
];

const mockReviews = [
  {
    id: 1,
    text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    rating: 8.9,
    author: `Kate Muir`,
    date: new Date(2016, 11, 24),
  },
  {
    id: 2,
    text: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
    rating: 7.2,
    author: `Matthew Lickona`,
    date: new Date(2016, 11, 20),
  },
  {
    id: 3,
    text: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
    rating: 8,
    author: `Bill Goodykoontz`,
    date: new Date(2015, 10, 18),
  },
];

const mockRawFilm = {
  [`name`]: `Gangs of new york`,
  [`poster_image`]: `https://htmlacademy-react-3.a…oster.jpg`,
  [`preview_image`]: `https://htmlacademy-react-3.a…_york.jpg`,
  [`background_image`]: `https://htmlacademy-react-3.a…_york.jpg`,
  [`background_color`]: `#A6B7AC`,
  [`description`]: `In 1862, Amsterdam Vallon ret…s killer.`,
  [`rating`]: 8.8,
  [`scores_count`]: 370881,
  [`director`]: `Martin Scorsese`,
  [`starring`]: [`Leonardo DiCaprio`, `Cameron …ay-Lewis`],
  [`run_time`]: 167,
  [`genre`]: `Crime`,
  [`released`]: 2002,
  [`id`]: 1,
  [`is_favorite`]: false,
  [`video_link`]: `http://peach.themazzone.com/d…round.mp4`,
  [`preview_video_link`]: `https://download.blender.org/…-480p.mp4`,
};

const mockRawFilmToMovie = {
  id: 1,
  title: `Gangs of new york`,
  smallPictureUrl: `https://htmlacademy-react-3.a…_york.jpg`,
  backgroundUrl: `https://htmlacademy-react-3.a…_york.jpg`,
  backgroundColor: `#A6B7AC`,
  posterUrl: `https://htmlacademy-react-3.a…oster.jpg`,
  videoUrl: `http://peach.themazzone.com/d…round.mp4`,
  previewUrl: `https://download.blender.org/…-480p.mp4`,
  genres: [`Crime`],
  releaseDate: new Date(2002, 0),
  description: [`In 1862, Amsterdam Vallon ret…s killer.`],
  directors: [`Martin Scorsese`],
  starring: [`Leonardo DiCaprio`, `Cameron …ay-Lewis`],
  runTime: 167,
  reviews: [],
  rating: {
    score: 8.8,
    totalVotes: 370881,
  },
  isFavorite: false,
};


export {
  mockMovies,
  mockPromoMovie,
  mockRawFilm,
  mockRawFilmToMovie,
  mockReviews,
};
