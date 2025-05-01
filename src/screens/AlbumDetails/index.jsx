import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ArrowLeft, Heart, More, Play } from 'iconsax-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const AlbumDetails = () => {
  const navigation = useNavigation();
  const { params: { album } } = useRoute();

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#4682B4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Album Details</Text>
        <TouchableOpacity>
          <More size={24} color="#4682B4" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Album Cover and Basic Info */}
        <View style={styles.albumHeader}>
          <Image source={{ uri: album.cover }} style={styles.albumCover} />
          <View style={styles.albumInfo}>
            <Text style={styles.albumTitle}>{album.title}</Text>
            <Text style={styles.albumArtist}>{album.artist}</Text>
            <Text style={styles.albumDetails}>
              {album.releaseDate} • {album.songs.length} songs
            </Text>
            <View style={styles.albumActions}>
              <TouchableOpacity style={styles.playButton}>
                <Play size={20} color="#fff" />
                <Text style={styles.playButtonText}>Play</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.likeButton}>
                <Heart size={20} color="#4682B4" variant={album.isLiked ? 'Bold' : 'Linear'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Track List */}
        <View style={styles.trackList}>
          <Text style={styles.sectionTitle}>Track List</Text>
          {album.songs.map((song, index) => (
            <TouchableOpacity key={index} style={styles.trackItem}>
              <Text style={styles.trackNumber}>{index + 1}</Text>
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{song.title}</Text>
                <Text style={styles.trackDuration}>{song.duration}</Text>
              </View>
              <More size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Album Description */}
        <View style={styles.description}>
          <Text style={styles.sectionTitle}>About This Album</Text>
          <Text style={styles.descriptionText}>{album.description}</Text>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4682B4',
  },
  albumHeader: {
    flexDirection: 'row',
    padding: 20,
  },
  albumCover: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 20,
  },
  albumInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  albumTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  albumArtist: {
    fontSize: 16,
    color: '#4682B4',
    marginBottom: 5,
  },
  albumDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  albumActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    flexDirection: 'row',
    backgroundColor: '#4682B4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 15,
  },
  playButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  likeButton: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4682B4',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  trackList: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  trackNumber: {
    width: 30,
    color: '#666',
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 3,
  },
  trackDuration: {
    fontSize: 12,
    color: '#666',
  },
  description: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
});

export default AlbumDetails;
