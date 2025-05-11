const newReleases = [
    {
      title: 'Meovv - Hands Up',
      year: '2025',
      image: 'http://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV7WTK8n-5j-7i64so3AY2j5QaEa2Gnckdlg&s',
    },
    {
      title: 'Jennie - Ruby',
      year: '2025',
      image: 'https://koreanindo.net/wp-content/uploads/2025/02/ruby-1-.jpeg',
    },
    {
      title: 'Jisoo - Amortage',
      year: '2025',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsZbdL0gkNo5fEluWd0qDB5Rsy89x3a4Zo-w&s',
    },
    {
      title: 'Baby Monster - Drip',
      year: '2024',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9f8aaI-Puk0Tadp723Bl0L7nc585ajYQYgQ&s',
    },
    {
      title: 'Atezz - Golden Hour',
      year: '2024',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQke7-_17kYJl06tz5SlUiuz4TfZfkJINY3w&s',
    },
  ];

  const recommendedAlbums = [
    {
      title: 'Aespa - Whiplash',
      year: '2025',
      image: 'https://i.scdn.co/image/ab67616d0000b2736eb604294f8f58c9078f58b1',
    },
    {
      title: 'Riize - Talk Saxy',
      year: '2024',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5nelJzcBbhRrlQ8Q_6mH34LXnV2qcfCN_Rw&s',
    },
    {
      title: 'NMIXX - Love Me Like This',
      year: '2024',
      image: 'https://i.scdn.co/image/ab67616d00001e024b32002f8a5e4ee2a5db5ace',
    },
    {
      title: 'Enhypen - Romance Untold Daydream',
      year: '2024',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIJPu6Ki2Gmu0qlnOBXyqN6emcbwxPSYVRmA&s',
    },
    {
      title: 'Riize - Rizing',
      year: '2024',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6M_hNQBNrzPOleuSwE5SftGBVtfC3Yr8pEw&s',
    },
  ];
const playlistData = [
    {
      id: '1',
      name: 'BTS Essentials',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwNyHq1YiJXe6p_a_xAjlTUtAUFXXpPpRppA&s',
      duration: '2h 45m',
      songs: [
        {
          id: '101',
          title: 'Dynamite',
          artist: 'BTS',
          coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCAhpBkR-Czi28WJ-k3HU_s3OXAm8IqoNK0A&s',
          year: '2020',
        },
        {
          id: '102',
          title: 'Butter',
          artist: 'BTS',
          coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1PlHlCHG_McGGS9OYp9cn6qwduLj-1Y_1_A&s',
          year: '2021',
        },
        {
          id: '103',
          title: 'Boy With Luv',
          artist: 'BTS ft. Halsey',
          coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJZDJAj6sw_TpijhCScoSgyGOyhLnElxHHnw&s',
          year: '2019',
        },
      ],
    },
    {
      id: '2',
      name: 'BLACKPINK Hits',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTM8l26_LYOxUQbNUOuk55GmXSbx8w_xbkLg&s',
      duration: '1h 30m',
      songs: [
        {
          id: '201',
          title: 'DDU-DU DDU-DU',
          artist: 'BLACKPINK',
          coverImage: 'https://upload.wikimedia.org/wikipedia/id/2/26/Black_Pink_-_Square_Up_artwork.png',
          year: '2018',
        },
        {
          id: '202',
          title: 'How You Like That',
          artist: 'BLACKPINK',
          coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxHfD4FAC9hDJ1wcVZsznV1ntQsqpCeV07Pw&s',
          year: '2020',
        },
      ],
    },
    {
      id: '3',
      name: 'Chill K-pop Vibes',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGXfJTqXzlnX88hXjd7qdttCz1uTSnZRzmdA&s',
      duration: '3h 15m',
      songs: [
        {
          id: '301',
          title: 'Psycho',
          artist: 'Red Velvet',
          coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH7WGOuNz7D3AE6FO1x75lXBHIH2Bh7IrOVA&s',
          year: '2019',
        },
        {
          id: '302',
          title: 'Love Scenario',
          artist: 'iKON',
          coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj_up5vVClgGa-swX2Ro7LSHjbK4SaAv38Jw&s',
          year: '2018',
        },
        {
          id: '303',
          title: 'Feel Special',
          artist: 'TWICE',
          coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb14_nwD2Nanmmix4P2SOQZ_ki9fXp4v36fA&s',
          year: '2019',
        },
      ],
    },
    {
      id: '4',
      name: 'Aespa Hits',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjCldL12ymlYHVK-TJHrwhz1FtC_8bmMfn8A&s',
      duration: '3h 15m',
      songs: [
        {
          id: '401',
          title: 'Whiplash',
          artist: 'Aespa',
          coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiJJ4N_Wk4NJsqIWOfe2a7XqDvr_QJL4NZA&s',
          year: '2024',
        },
        {
          id: '402',
          title: 'Armageddon',
          artist: 'Aespa',
          coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJEH9bSBapdkSdyxn-YaKawEYSAnzINhcAuQ&s',
          year: '2024',
        },
        {
          id: '403',
          title: 'Drama',
          artist: 'Aespa',
          coverImage: 'https://i.scdn.co/image/ab67616d0000b273c54e39f2ae0dd10731f93c08',
          year: '2023',
        },
      ],
    },
  ];

  const kpopAlbums = [
    {
      id: '1',
      title: 'The Album',
      artist: 'BLACKPINK',
      cover: 'https://i.scdn.co/image/ab67616d0000b2737dd8f95320e8ef08aa121dfe',
      releaseDate: 'October 2, 2020',
      type: 'girl-group',
      isLiked: true,
      songs: [
        { title: 'How You Like That', duration: '3:02' },
        { title: 'Ice Cream (with Selena Gomez)', duration: '2:57' },
        { title: 'Pretty Savage', duration: '3:21' },
        { title: 'Bet You Wanna (feat. Cardi B)', duration: '2:41' },
        { title: 'Lovesick Girls', duration: '3:12' },
      ],
      description: 'THE ALBUM is the first Korean-language studio album by South Korean girl group BLACKPINK, released on October 2, 2020, by YG Entertainment and Interscope Records. It features collaborations with Selena Gomez and Cardi B.',
    },
    {
      id: '2',
      title: 'Target: Me',
      artist: 'Evnne',
      cover: 'https://i.scdn.co/image/ab67616d0000b273569689ef998a192f7809467a',
      releaseDate: 'September 19, 2023',
      type: 'boy-group',
      isLiked: false,
      songs: [
        { title: 'Trouble', duration: '3:27' },
        { title: 'Role Model', duration: '3:14' },
        { title: 'Pretty Things', duration: '3:02' },
        { title: 'Your Text', duration: '2:59' },
        { title: 'Jukebox', duration: '3:02' },
        { title: 'Even More', duration: '3:19' },
      ],
      description: 'Our first mini-album and our debut album, “Target: ME” is about our will to become the target of the publics attention',
    },
    {
      id: '3',
      title: 'Drama',
      artist: 'Aespa',
      cover: 'https://i.scdn.co/image/ab67616d00001e02a991995542d50a691b9ae5be',
      releaseDate: 'November 10, 2023',
      type: 'girl-group',
      isLiked: true,
      songs: [
        { title: 'Drama', duration: '3:34' },
        { title: 'Trick or Trick', duration: '2:55' },
        { title: 'Don\'t Blink', duration: '2:49' },
        { title: 'Hot Air Balloon', duration: '3:18' },
        { title: 'Yolo', duration: '3:09' },
        { title: 'You', duration: '3:23' },
      ],
      description: 'The drama tells about Aespa courage in facing various obstacles and problems in their lives',
    },
    {
      id: '4',
      title: 'The ReVe Festival: Day 1',
      artist: 'Red Velvet',
      cover: 'https://upload.wikimedia.org/wikipedia/id/b/ba/Red_Velvet_-_The_ReVe_Festival_Day_1.png',
      releaseDate: 'June 19, 2019',
      type: 'girl-group',
      isLiked: false,
      songs: [
        { title: 'Zimzalabim', duration: '3:10' },
        { title: 'Sunny Side Up!', duration: '3:23' },
        { title: 'Milkshake', duration: '3:33' },
        { title: 'Bing Bing', duration: '3:27' },
      ],
      description: 'The ReVe Festival: Day 1 is the sixth extended play by South Korean girl group Red Velvet. It was released on June 19, 2019, by SM Entertainment. The EP is the first part of their "ReVe Festival" trilogy.',
    },
    {
      id: '5',
      title: 'Born to Be',
      artist: 'Itzy',
      cover: 'https://upload.wikimedia.org/wikipedia/id/2/2c/Itzy_-_Born_to_Be_%28digital%29.jpg',
      releaseDate: 'January 8, 2024',
      type: 'girl-group',
      isLiked: true,
      songs: [
        { title: 'Born to Be', duration: '2:59' },
        { title: 'Untouchable', duration: '3:15' },
        { title: 'Dynamite', duration: '2:50' },
        { title: 'Crown on My Head (Yeji)', duration: '3:13' },
        { title: 'Blossoms (Lia)', duration: '3:15' },
        { title: 'Run Away (Ryujin)', duration: '3:37' },
        { title: 'Mine (Chaeryoung)', duration: '2:49' },
        { title: 'Yet, But (Yuna)', duration: '3:26' },
        { title: 'Escalator', duration: '3:21' },
      ],
      description: 'Born to Be is one of the new songs made popular by the famous girl group from South Korea, ITZY.',
    },
    {
      id: '6',
      title: 'Neo Zone',
      artist: 'NCT 127',
      cover: 'https://upload.wikimedia.org/wikipedia/id/3/3f/NCT_127_Neo_Zone.png',
      releaseDate: 'March 6, 2020',
      type: 'boy-group',
      isLiked: false,
      songs: [
        { title: 'Kick It', duration: '3:53' },
        { title: 'Pandora\'s Box', duration: '3:05' },
        { title: 'Day Dream', duration: '3:10' },
        { title: 'Mad Dog', duration: '3:03' },
      ],
      description: 'Neo Zone is the second Korean-language studio album by South Korean boy group NCT 127, the Seoul-based sub-unit of the South Korean boy group NCT. It was released on March 6, 2020, by SM Entertainment.',
    },
  ];

const userProfile = {
  name: 'PeachFall',
  email: 'peachfall@example.com',
  joinDate: 'Joined Oktober 2016',
  profileImage: 'https://st3.depositphotos.com/5045705/34715/v/1600/depositphotos_347157306-stock-illustration-cute-cartoon-peach-kawaii-face.jpg',
  stats: {
    albums: 142,
    playlists: 18,
    following: 50000,
  },
  favoriteArtists: [
    {
      id: '1',
      name: 'BTS',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwNyHq1YiJXe6p_a_xAjlTUtAUFXXpPpRppA&s',
    },
    {
      id: '2',
      name: 'BLACKPINK',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTM8l26_LYOxUQbNUOuk55GmXSbx8w_xbkLg&s',
    },
    {
      id: '3',
      name: 'EXO',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3FdExwaOn2hoVKqFsOToUw2xkq-_wmsPc6A&s',
    },
    {
      id: '4',
      name: 'Aespa',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjCldL12ymlYHVK-TJHrwhz1FtC_8bmMfn8A&s',
    },
  ],
  recentPlays: [
    {
      id: '1',
      title: 'The Chase',
      artist: 'Hearts2Hearts',
      albumCover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWxaaGTi_DBUg8DasGKR4nMr9d0-_rHKoj6A&s',
      time: '2 hours ago',
    },
    {
      id: '2',
      title: 'Born Again',
      artist: 'Lisa Feat Doja Cat & Raye',
      albumCover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStrNDAu37W03wdIHZn-MABsYmuc3exEsoTww&s',
      time: '5 hours ago',
    },
    {
      id: '3',
      title: 'Like Jennie',
      artist: 'Jennie',
      albumCover: 'https://i.scdn.co/image/ab67616d0000b2735a43918ea90bf1e44b7bdcfd',
      time: '1 day ago',
    },
  ],
};

export { newReleases, recommendedAlbums, playlistData, kpopAlbums, userProfile };
