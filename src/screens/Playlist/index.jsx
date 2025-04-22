import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, FlatList, Image } from 'react-native';
import { Add, Play, More } from 'iconsax-react-native';
import ItemSmall from '../../components/ItemSmall.jsx';
import { playlistData } from '../../data.jsx';

const Playlist = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlists, setPlaylists] = useState(playlistData);

  const handleCreatePlaylist = () => {
    const newPlaylist = {
      id: `${playlists.length + 1}`,
      name: `New Playlist ${playlists.length + 1}`,
      coverImage: 'https://i.scdn.co/image/ab67706f00000002a3d3a3a3a3a3a3a3a3a3a3a3',
      duration: '0m',
      songs: [],
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Playlists</Text>
      </View>

      <ScrollView>
        {selectedPlaylist ? (
          <View style={styles.playlistDetail}>
            <View style={styles.playlistHeader}>
              <Image
                source={{ uri: selectedPlaylist.coverImage }}
                style={styles.playlistCover}
              />
              <View style={styles.playlistInfo}>
                <Text style={styles.playlistTitle}>{selectedPlaylist.name}</Text>
                <Text style={styles.playlistStats}>
                  {selectedPlaylist.songs.length} albums • {selectedPlaylist.duration}
                </Text>
                <View style={styles.playlistActions}>
                  <Pressable style={styles.playButton}>
                    <Play size={24} color="#fff" />
                    <Text style={styles.playButtonText}>Play All</Text>
                  </Pressable>
                  <Pressable style={styles.moreButton}>
                    <More size={24} color="#4682B4" />
                  </Pressable>
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Albums in this Playlist</Text>
            <FlatList
              data={selectedPlaylist.songs}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <ItemSmall album={item} />}
            />
            <Pressable
              style={styles.backButton}
              onPress={() => setSelectedPlaylist(null)}
            >
              <Text style={styles.backButtonText}>Back to Playlists</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <Pressable
              style={styles.createPlaylistButton}
              onPress={handleCreatePlaylist}
            >
              <Add size={24} color="#4682B4" />
              <Text style={styles.createPlaylistText}>Create New Playlist</Text>
            </Pressable>

            <Text style={styles.sectionTitle}>Your Playlists</Text>
            <FlatList
              data={playlists}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.playlistItem}
                  onPress={() => setSelectedPlaylist(item)}
                >
                  <Image
                    source={{ uri: item.coverImage }}
                    style={styles.playlistThumbnail}
                  />
                  <View style={styles.playlistItemInfo}>
                    <Text style={styles.playlistItemTitle}>{item.name}</Text>
                    <Text style={styles.playlistItemStats}>
                      {item.songs.length} albums • {item.duration}
                    </Text>
                  </View>
                </Pressable>
              )}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4682B4',
  },
  createPlaylistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#E6F2FF',
    borderRadius: 10,
  },
  createPlaylistText: {
    marginLeft: 10,
    color: '#4682B4',
    fontSize: 16,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4682B4',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 10,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#F8F9FF',
    borderRadius: 10,
  },
  playlistThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  playlistItemInfo: {
    marginLeft: 15,
    flex: 1,
  },
  playlistItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  playlistItemStats: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  playlistDetail: {
    paddingBottom: 30,
  },
  playlistHeader: {
    flexDirection: 'row',
    padding: 20,
  },
  playlistCover: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  playlistInfo: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  playlistTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },
  playlistStats: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  playlistActions: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4682B4',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  playButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: '500',
  },
  moreButton: {
    marginLeft: 10,
    padding: 8,
  },
  backButton: {
    backgroundColor: '#4682B4',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default Playlist;
