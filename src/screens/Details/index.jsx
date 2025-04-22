import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native';
import { Play, Heart, Share, More } from 'iconsax-react-native';
import { albumDetails } from '../../data.jsx';

const { width } = Dimensions.get('window');

const Details = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const handlePlayAll = () => console.log('Playing all tracks');
  const handleShare = () => console.log('Sharing album');
  const handleMoreOptions = () => console.log('More options');
  const handleTrackPress = (trackId) => console.log('Playing track:', trackId);
  const handleSimilarAlbumPress = (albumId) => console.log('Selected album:', albumId);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerTitle}>Album Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Album Cover and Info */}
        <View style={styles.albumHeader}>
          <Image source={{ uri: albumDetails.coverImage }} style={styles.albumCover} resizeMode="cover" />
          <View style={styles.albumInfo}>
            <Text style={styles.albumTitle}>{albumDetails.title}</Text>
            <Text style={styles.albumArtist}>{albumDetails.artist}</Text>
            <View style={styles.albumMeta}>
              <Text style={styles.albumMetaText}>{albumDetails.year}</Text>
              <Text style={styles.albumMetaText}>•</Text>
              <Text style={styles.albumMetaText}>{albumDetails.genre}</Text>
              <Text style={styles.albumMetaText}>•</Text>
              <Text style={styles.albumMetaText}>{albumDetails.totalTracks} songs</Text>
            </View>
            <Text style={styles.albumLabel}>{albumDetails.label}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Pressable style={styles.playButton} onPress={handlePlayAll}>
            <Play size={24} color="#fff" />
            <Text style={styles.playButtonText}>Play All</Text>
          </Pressable>
          <Pressable style={styles.iconButton} onPress={toggleFavorite}>
            <Heart
              size={24}
              color="#4682B4"
              variant={isFavorite ? 'Bold' : 'Linear'}
              fill={isFavorite ? '#4682B4' : 'none'}
            />
          </Pressable>
          <Pressable style={styles.iconButton} onPress={handleShare}>
            <Share size={24} color="#4682B4" />
          </Pressable>
          <Pressable style={styles.iconButton} onPress={handleMoreOptions}>
            <More size={24} color="#4682B4" />
          </Pressable>
        </View>

        {/* Album Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This Album</Text>
          <Text style={styles.descriptionText}>{albumDetails.description}</Text>
        </View>

        {/* Track List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Track List</Text>
          {albumDetails.songs.map((song) => (
            <Pressable
              key={song.id}
              style={styles.trackItem}
              onPress={() => handleTrackPress(song.id)}
            >
              <Text style={styles.trackNumber}>{song.id}</Text>
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{song.title}</Text>
                <View style={styles.trackMeta}>
                  {song.plays && <Text style={styles.trackPlays}>{song.plays} plays</Text>}
                  <Text style={styles.trackDuration}>{song.duration}</Text>
                </View>
              </View>
              <Pressable
                style={styles.trackPlayButton}
                onPress={() => handleTrackPress(song.id)}
              >
                <Play size={20} color="#4682B4" variant="Bold" />
              </Pressable>
            </Pressable>
          ))}
        </View>

        {/* Similar Albums */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>You Might Also Like</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.similarAlbumsContainer}
          >
            {albumDetails.similarAlbums.map((similarAlbum) => (
              <Pressable
                key={similarAlbum.id}
                style={styles.similarAlbum}
                onPress={() => handleSimilarAlbumPress(similarAlbum.id)}
              >
                <Image
                  source={{ uri: similarAlbum.coverImage }}
                  style={styles.similarAlbumCover}
                  resizeMode="cover"
                />
                <Text style={styles.similarAlbumTitle} numberOfLines={1}>
                  {similarAlbum.title}
                </Text>
                <Text style={styles.similarAlbumArtist} numberOfLines={1}>
                  {similarAlbum.artist}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
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
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4682B4',
  },
  headerSpacer: {
    width: 24,
  },
  albumHeader: {
    flexDirection: 'row',
    padding: 24,
    paddingBottom: 16,
  },
  albumCover: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: 12,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  albumInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  albumTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  albumArtist: {
    fontSize: 16,
    color: '#4682B4',
    marginBottom: 8,
    fontWeight: '600',
  },
  albumMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 8,
  },
  albumMetaText: {
    fontSize: 13,
    color: '#666',
    marginRight: 6,
  },
  albumLabel: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4682B4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginRight: 16,
    shadowColor: '#4682B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  playButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4682B4',
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  trackNumber: {
    width: 30,
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginRight: 8,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 15,
    color: '#1A1A2E',
    fontWeight: '500',
    marginBottom: 4,
  },
  trackMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackPlays: {
    fontSize: 12,
    color: '#888',
    marginRight: 8,
  },
  trackDuration: {
    fontSize: 13,
    color: '#888',
  },
  trackPlayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  similarAlbumsContainer: {
    paddingRight: 24,
  },
  similarAlbum: {
    width: 140,
    marginRight: 16,
  },
  similarAlbumCover: {
    width: 140,
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  similarAlbumTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 2,
  },
  similarAlbumArtist: {
    fontSize: 12,
    color: '#666',
  },
});

export default Details;
