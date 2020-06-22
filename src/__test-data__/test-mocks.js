const promoMovie = {
  title: `The Grand Budapest Hotel`,
  smallPictureUrl: ``,
  backgroundUrl: `img/bg-the-grand-budapest-hotel.jpg`,
  posterUrl: `img/the-grand-budapest-hotel-poster.jpg`,
  genre: `Drama`,
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
  runTime: `99`,
  reviews: [],
};

const films = [
  {
    title: `Bohemian Rhapsody`,
    smallPictureUrl: `img/bohemian-rhapsody.jpg`,
    backgroundUrl: `img/bohemian-rhapsody.jpg`,
    posterUrl: `img/bohemian-rhapsody.jpg`,
    genre: `Drama`,
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
    runTime: `134`,
    reviews: [],
  },

  {
    title: `Aviator`,
    smallPictureUrl: `img/aviator.jpg`,
    backgroundUrl: `img/aviator.jpg`,
    posterUrl: `img/aviator.jpg`,
    genre: `Drama`,
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
    runTime: `163`,
    reviews: [],
  },

  {
    title: `Revenant`,
    smallPictureUrl: `img/revenant.jpg`,
    backgroundUrl: `img/revenant.jpg`,
    posterUrl: `img/revenant.jpg`,
    genre: `Drama`,
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
    runTime: `156`,
    reviews: [],
  },

  {
    title: `Johnny English`,
    smallPictureUrl: `img/johnny-english.jpg`,
    backgroundUrl: `img/johnny-english.jpg`,
    posterUrl: `img/johnny-english.jpg`,
    genre: `Comedy`,
    releaseDate: new Date(2003, 0),
    description: [
      `История самого некомпетентного и недалекого Британского дипломата, которого только можно представить, которого ошибочно принимают за самого знаменитого
      и опасного шпиона Великобритании, Джонни Инглиша. Из-за этой путаницы герой оказывается вовлеченным в смертельную схватку с авторами очередного
      дьявольского плана.`,
    ],
    directors: [`Питер Хауит`],
    starring: [
      `Роуэн Эткинсон`,
      `Натали Имбрулья`,
      `Бен Миллер`,
      `Джон Малкович`,
      `Тим Пиготт-Смит`,
      `Кевин МакНэлли`,
      `Оливер Форд Дейвис`,
      `Дуглас МакФерран`,
      `Таша ди Вашконселуш`,
      `Грег Уайз      `,
    ],
    runTime: `84`,
    reviews: [],
  },

  {
    title: `Shutter Island`,
    smallPictureUrl: `img/shutter-island.jpg`,
    backgroundUrl: `img/shutter-island.jpg`,
    posterUrl: `img/shutter-island.jpg`,
    genre: `Drama`,
    releaseDate: new Date(2009, 0),
    description: [
      `Два американских судебных пристава отправляются на один из островов в штате Массачусетс, чтобы расследовать исчезновение пациентки клиники для умалишенных
      преступников. При проведении расследования им придется столкнуться с паутиной лжи, обрушившимся ураганом и смертельным бунтом обитателей клиники.`,
    ],
    directors: [`Мартин Скорсезе`],
    starring: [
      `Леонардо ДиКаприо`,
      `Марк Руффало`,
      `Бен Кингсли`,
      `Макс фон Сюдов`,
      `Мишель Уильямс`,
      `Эмили Мортимер`,
      `Патриша Кларксон`,
      `Джеки Эрл Хейли`,
      `Тед Левайн`,
      `Джон Кэрролл Линч      `,
    ],
    runTime: `138`,
    reviews: [],
  },

  {
    title: `Pulp Fiction`,
    smallPictureUrl: `img/pulp-fiction.jpg`,
    backgroundUrl: `img/pulp-fiction.jpg`,
    posterUrl: `img/pulp-fiction.jpg`,
    genre: `Thriller`,
    releaseDate: new Date(1994, 0),
    description: [
      `Двое бандитов Винсент Вега и Джулс Винфилд ведут философские беседы в перерывах между разборками и решением проблем с должниками криминального босса
      Марселласа Уоллеса.`,
      `В первой истории Винсент проводит незабываемый вечер с женой Марселласа Мией. Во второй рассказывается о боксёре Бутче Кулидже, купленном Уоллесом,
      чтобы сдать бой. В третьей истории Винсент и Джулс по нелепой случайности попадают в неприятности.`,
    ],
    directors: [`Квентин Тарантино`],
    starring: [
      `Джон Траволта`,
      `Сэмюэл Л. Джексон`,
      `Брюс Уиллис`,
      `Ума Турман`,
      `Винг Реймз`,
      `Тим Рот`,
      `Харви Кейтель`,
      `Квентин Тарантино`,
      `Питер Грин`,
      `Аманда Пламмер      `,
    ],
    runTime: `154`,
    reviews: [],
  },

  {
    title: `Seven Years in Tibet`,
    smallPictureUrl: `img/seven-years-in-tibet.jpg`,
    backgroundUrl: `img/seven-years-in-tibet.jpg`,
    posterUrl: `img/seven-years-in-tibet.jpg`,
    genre: `Drama`,
    releaseDate: new Date(1997, 0),
    description: [
      `Генрих Харрер, офицер Рейха, человек, у которого было все — успех, красота, известность. Но ему было мало земной славы. Оставив дома беременную жену,
      он отправляется на покорение самого неприступного пика в Гималаях. Этот подвиг должен увековечить его имя.`,
      `Однако впереди его ждет не успешное восхождение, а смертельная опасность, вражеский плен, долгие скитания… Наконец он добирается до таинственного
      тибетского города Лхаса, где ему предстоит провести долгих семь лет, и где молодой Далай Лама делает его своим приближенным. И здесь, в стране, лежащей за
      границами цивилизации, ему придется пережить события, которые навсегда изменят его жизнь…`,
    ],
    directors: [`Жан-Жак Анно`],
    starring: [
      `Брэд Питт`,
      `Дэвид Тьюлис`,
      `Б.Д. Вонг`,
      `Мако`,
      `Дэнни Дензонгпа`,
      `Виктор Вонг`,
      `Ингеборга Дапкунайте`,
      `Цзямъян Цзямцо Ванчук`,
      `Лакпа Тсамшо`,
      `Джетсун Пема      `,
    ],
    runTime: `136`,
    reviews: [],
  },

  {
    title: `Snatch`,
    smallPictureUrl: `img/snatch.jpg`,
    backgroundUrl: `img/snatch.jpg`,
    posterUrl: `img/snatch.jpg`,
    genre: `Action movie`,
    releaseDate: new Date(2000, 0),
    description: [
      `Четырехпалый Френки должен был переправить краденый алмаз из Англии в США своему боссу Эви. Но вместо этого герой попадает в эпицентр больших неприятностей.
      Сделав ставку на подпольном боксерском поединке, Френки попадает в круговорот весьма нежелательных событий.`,
      `Вокруг героя и его груза разворачивается сложная интрига с участием множества колоритных персонажей лондонского дна — русского гангстера, троих незадачливых
      грабителей, хитрого боксера и угрюмого громилы грозного мафиози. Каждый норовит в одиночку сорвать Большой Куш.`,
    ],
    directors: [`Гай Ричи`],
    starring: [
      `Джейсон Стэйтем`,
      `Стивен Грэм`,
      `Брэд Питт`,
      `Алан Форд`,
      `Робби Ги`,
      `Ленни Джеймс`,
      `Эд`,
      `Деннис Фарина`,
      `Раде Шербеджия`,
      `Винни Джонс      `,
    ],
    runTime: `104`,
    reviews: [],
  },
];

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
  genreNames,
  promoMovie,
  films,
};
