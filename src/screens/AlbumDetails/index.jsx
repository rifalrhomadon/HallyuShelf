import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Easing, Alert } from 'react-native';
import { ArrowLeft, Heart, More, Play } from 'iconsax-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAlbums } from '../../contexts/AlbumContext';

const AlbumDetails = () => {
  const navigation = useNavigation();
  const { params: { album } } = useRoute();
  const { deleteAlbum, toggleLike } = useAlbums();

  const headerTranslateY = useRef(new Animated.Value(-50)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const coverScale = useRef(new Animated.Value(0.8)).current;
  const infoOpacity = useRef(new Animated.Value(0)).current;
  const infoTranslateX = useRef(new Animated.Value(30)).current;
  const trackOpacity = useRef(new Animated.Value(0)).current;
  const trackTranslateY = useRef(new Animated.Value(20)).current;
  const descOpacity = useRef(new Animated.Value(0)).current;
  const descTranslateY = useRef(new Animated.Value(20)).current;

  // Inisialisasi animasi saat komponen mount
  useEffect(() => {
    Animated.sequence([
      // Animasi header
      Animated.parallel([
        Animated.timing(headerTranslateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      // Animasi cover album
      Animated.spring(coverScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),

      // Animasi info album
      Animated.parallel([
        Animated.timing(infoOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(infoTranslateX, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      // Animasi daftar lagu
      Animated.parallel([
        Animated.timing(trackOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(trackTranslateY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      // Animasi deskripsi
      Animated.parallel([
        Animated.timing(descOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(descTranslateY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [coverScale, descOpacity, descTranslateY, headerOpacity, headerTranslateY, infoOpacity, infoTranslateX, trackOpacity, trackTranslateY]);

  const handleDeleteAlbum = async () => {
    try {
      await deleteAlbum(album.id);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to delete album:', error);
      alert('Failed to delete album. Please try again.');
    }
  };

  const handleEditAlbum = () => {
    navigation.navigate('EditAlbumForm', { album });
  };

  const handleToggleLike = () => {
    toggleLike(album.id);
  };

  // Render item lagu dengan animasi stagger
  const renderTrackItem = (song, index) => {
    const itemOpacity = trackOpacity.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    const itemTranslateY = trackTranslateY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -20 + (index * 5)],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={index}
        style={{
          opacity: itemOpacity,
          transform: [{ translateY: itemTranslateY }],
        }}
      >
        <TouchableOpacity style={styles.trackItem}>
          <Text style={styles.trackNumber}>{index + 1}</Text>
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>{song.title}</Text>
            <Text style={styles.trackDuration}>{song.duration}</Text>
          </View>
          <More size={20} color="#666" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.header,
        {
          opacity: headerOpacity,
          transform: [{ translateY: headerTranslateY }],
        },
      ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#4682B4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Album Details</Text>
        <TouchableOpacity onPress={() => {
          Alert.alert(
            'Album Options',
            'Choose an action',
            [
              {
                text: 'Edit Album',
                onPress: handleEditAlbum,
              },
              {
                text: 'Delete Album',
                onPress: () => {
                  Alert.alert(
                    'Confirm Delete',
                    'Are you sure you want to delete this album?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Delete', onPress: handleDeleteAlbum, style: 'destructive' },
                    ]
                  );
                },
                style: 'destructive',
              },
              { text: 'Cancel', style: 'cancel' },
            ]
          );
        }}>
          <More size={24} color="#4682B4" />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView>
        <View style={styles.albumHeader}>
          <Animated.Image
            source={{ uri: album.cover }}
            style={[
              styles.albumCover,
              { transform: [{ scale: coverScale }] },
            ]}
          />
          <Animated.View
            style={[
              styles.albumInfo,
              {
                opacity: infoOpacity,
                transform: [{ translateX: infoTranslateX }],
              },
            ]}
          >
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
              <TouchableOpacity style={styles.likeButton} onPress={handleToggleLike}>
                <Heart size={20} color="#4682B4" variant={album.isLiked ? 'Bold' : 'Linear'} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

        <Animated.View
          style={[
            styles.trackList,
            {
              opacity: trackOpacity,
              transform: [{ translateY: trackTranslateY }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Track List</Text>
          {album.songs.map(renderTrackItem)}
        </Animated.View>

        <Animated.View
          style={[
            styles.description,
            {
              opacity: descOpacity,
              transform: [{ translateY: descTranslateY }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>About This Album</Text>
          <Text style={styles.descriptionText}>{album.description}</Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

// Styles tetap sama seperti sebelumnya
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