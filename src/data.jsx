const newReleases = [
    {
      title: 'Hearts2Hearts - The Chase',
      year: '2025',
      image: 'https://i.scdn.co/image/ab67616d0000b273d346fc1102eb417305b5358b',
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

  const albumDetails = {
    id: '101',
    title: 'Whiplash',
    artist: 'Aespa',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiJJ4N_Wk4NJsqIWOfe2a7XqDvr_QJL4NZA&s',
    year: '2024',
    genre: 'K-pop, Dance-pop, Drama',
    label: 'SM Entertainment',
    totalTracks: 4,
    duration: '11:53',
    songs: [
      { id: '1', title: 'Whiplash', duration: '3:04', plays: '1.2B' },
      { id: '2', title: 'Kill it', duration: '3:20', plays: '450M' },
      { id: '3', title: 'Flight, Not Feelings', duration: '3:02', plays: '780M' },
      { id: '4', title: 'Pink Hoodie', duration: '2:27', plays: '650M' },
    ],
    description: '"The music video for the title track "Whiplash" features futuristic visuals and advanced CGI effects.',
    similarAlbums: [
      {
        id: '201',
        title: 'The Chase',
        artist: 'Hearts2Hearts',
        coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWxaaGTi_DBUg8DasGKR4nMr9d0-_rHKoj6A&s',
      },
      {
        id: '202',
        title: 'Drip',
        artist: 'Baby Monster',
        coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn8wiVXC57z1FdgJO_scGViZWZBkRKTW6Djw&s',
      },
      {
        id: '203',
        title: 'Hot Sauce',
        artist: 'NCT Dream',
        coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CfOZweL1gS2LehJBybYwC2LvBcZsTfO2yg&s',
      },
    ],
  };

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

export { newReleases, recommendedAlbums, playlistData, albumDetails, userProfile };
