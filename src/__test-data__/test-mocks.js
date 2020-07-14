const mockVideoUrl = `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`;

const promoMovie = {
  title: `The Grand Budapest Hotel`,
  smallPictureUrl: ``,
  backgroundUrl: `img/bg-the-grand-budapest-hotel.jpg`,
  posterUrl: `img/the-grand-budapest-hotel-poster.jpg`,
  previewUrl: mockVideoUrl,
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
  reviews: [],
  rating: {
    score: 8.9,
    totalVotes: 240,
  },
};

const movies = [
  {
    title: `Bohemian Rhapsody`,
    smallPictureUrl: `img/bohemian-rhapsody.jpg`,
    backgroundUrl: `img/bohemian-rhapsody.jpg`,
    posterUrl: `img/bohemian-rhapsody.jpg`,
    previewUrl: mockVideoUrl,
    genres: [`Drama`, `Biography`],
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
  },

  {
    title: `Aviator`,
    smallPictureUrl: `img/aviator.jpg`,
    backgroundUrl: `img/aviator.jpg`,
    posterUrl: `img/aviator.jpg`,
    previewUrl: mockVideoUrl,
    genres: [`Drama`, `Biography`],
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
  },

  {
    title: `Revenant`,
    smallPictureUrl: `img/revenant.jpg`,
    backgroundUrl: `img/revenant.jpg`,
    posterUrl: `img/revenant.jpg`,
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
  },
];

const VideoPlayerMode = {
  PREVIEW: `preview`,
  FULL_SCREEN: `full-screen`,
};

const VideoPlayerStatus = {
  ON_AUTOPLAY: `on-autoplay`,
  ON_PLAY: `on-play`,
  ON_PAUSE: `on-pause`,
  ON_RESET: `on-reset`,
};

const genreNames = [
  `All genres`,
  `Comedies`,
  `Crime`,
  `Documentary`,
  `Dramas`,
  `Horror`,
  `Kids & Family`,
  `Romance`,
  `Sci-Fi`,
  `Thrillers`,
];


export {
  VideoPlayerMode,
  VideoPlayerStatus,
  genreNames,
  movies,
  promoMovie,
};
