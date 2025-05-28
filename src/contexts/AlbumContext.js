import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AlbumContext = createContext();

export const AlbumProvider = ({ children }) => {
  const [albums, setAlbums] = useState([]);

  // Load data saat komponen mount
  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const savedAlbums = await AsyncStorage.getItem('@albums');
        if (savedAlbums) {
          setAlbums(JSON.parse(savedAlbums));
        } else {
          // Data default jika tidak ada yang tersimpan
          const defaultAlbums = [
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
            {
            id: '7',
            title: 'Love Language',
            artist: 'TXT',
            cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7wHSnRskD3vjyssSgmTEH_x48G1CPbW9gig&s',
            releaseDate: 'May 02, 2025',
            type: 'boy-group',
            isLiked: false,
            songs: [
                { title: 'Love Language', duration: '3:53' },
            ],
            description: 'TXT "Love Language" is a digital single that explores the concept of understanding and expressing love in various ways.',
            },
          ];
          setAlbums(defaultAlbums);
          await AsyncStorage.setItem('@albums', JSON.stringify(defaultAlbums));
        }
      } catch (error) {
        console.error('Failed to load albums', error);
      }
    };
    loadAlbums();
  }, []);

  // Simpan data ke AsyncStorage setiap kali albums berubah
  useEffect(() => {
    const saveAlbums = async () => {
      try {
        await AsyncStorage.setItem('@albums', JSON.stringify(albums));
      } catch (error) {
        console.error('Failed to save albums', error);
      }
    };
    saveAlbums();
  }, [albums]);

  const addAlbum = async (newAlbum) => {
    try {
      setAlbums([...albums, { ...newAlbum, id: Date.now().toString() }]);
    } catch (error) {
      throw new Error('Failed to add album');
    }
  };

  const updateAlbum = async (id, updatedAlbum) => {
    try {
      setAlbums(albums.map(album => 
        album.id === id ? { ...updatedAlbum, id } : album
      ));
    } catch (error) {
      throw new Error('Failed to update album');
    }
  };

  const deleteAlbum = async (id) => {
    try {
      setAlbums(albums.filter(album => album.id !== id));
    } catch (error) {
      throw new Error('Failed to delete album');
    }
  };

  const toggleLike = (id) => {
    setAlbums(albums.map(album => 
      album.id === id ? { ...album, isLiked: !album.isLiked } : album
    ));
  };

  return (
    <AlbumContext.Provider value={{ albums, addAlbum, updateAlbum, deleteAlbum, toggleLike }}>
      {children}
    </AlbumContext.Provider>
  );
};

export const useAlbums = () => React.useContext(AlbumContext);