import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, Animated, LayoutAnimation, UIManager, Platform, Easing, FlatList } from 'react-native';
import { Add, Play, More } from 'iconsax-react-native';
import ItemSmall from '../../components/ItemSmall.jsx';
import { playlistData } from '../../data.jsx';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// Custom animation configuration
const customLayoutAnimation = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 0.7,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    springDamping: 0.7,
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 0.7,
  },
};

const Playlist = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlists, setPlaylists] = useState(playlistData);

  // Animation values
  const containerFade = useState(new Animated.Value(0))[0];
  const containerScale = useState(new Animated.Value(0.97))[0];
  const buttonScale = useState(new Animated.Value(1))[0];
  const [itemAnimations] = useState(() =>
    playlistData.map(() => ({
      scale: new Animated.Value(1),
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(20),
    }))
  );

  // Initialize animations on mount
  useEffect(() => {
    // Container entrance animation
    Animated.parallel([
      Animated.timing(containerFade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(containerScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // Item stagger animations
    itemAnimations.forEach((anim, index) => {
      Animated.sequence([
        Animated.delay(index * 80),
        Animated.parallel([
          Animated.timing(anim.opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateY, {
            toValue: 0,
            duration: 500,
            easing: Easing.out(Easing.back(1.2)),
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    });
  }, [containerFade, containerScale, itemAnimations]);

  const handleCreatePlaylist = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    const newPlaylist = {
      id: `${playlists.length + 1}`,
      name: `New Playlist ${playlists.length + 1}`,
      coverImage: 'https://i.scdn.co/image/ab67706f00000002a3d3a3a3a3a3a3a3a3a3a3a3',
      duration: '0m',
      songs: [],
    };

    // Add new animation for the new item
    const newAnim = {
      scale: new Animated.Value(1),
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(20),
    };

    itemAnimations.push(newAnim);

    Animated.sequence([
      Animated.delay(100),
      Animated.parallel([
        Animated.timing(newAnim.opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(newAnim.translateY, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    LayoutAnimation.configureNext(customLayoutAnimation);
    setPlaylists([...playlists, newPlaylist]);
  };

  const handleSelectPlaylist = (playlist) => {
    LayoutAnimation.configureNext({
      ...customLayoutAnimation,
      duration: 500,
    });
    setSelectedPlaylist(playlist);
  };

  const handleBackToPlaylists = () => {
    LayoutAnimation.configureNext({
      ...customLayoutAnimation,
      duration: 500,
    });
    setSelectedPlaylist(null);
  };

  const renderPlaylistItem = ({ item, index }) => {
    const anim = itemAnimations[index] || {
      scale: new Animated.Value(1),
      opacity: new Animated.Value(1),
      translateY: new Animated.Value(0),
    };

    return (
      <Animated.View
        style={{
          opacity: anim.opacity,
          transform: [
            { translateY: anim.translateY },
            { scale: anim.scale },
          ],
        }}
      >
        <Pressable
          style={({ pressed }) => [
            styles.playlistItem,
            { transform: [{ scale: pressed ? 0.98 : 1 }] },
          ]}
          onPress={() => handleSelectPlaylist(item)}
          onPressIn={() => {
            Animated.spring(anim.scale, {
              toValue: 0.98,
              friction: 3,
              useNativeDriver: true,
            }).start();
          }}
          onPressOut={() => {
            Animated.spring(anim.scale, {
              toValue: 1,
              friction: 3,
              useNativeDriver: true,
            }).start();
          }}
        >
          <Animated.Image
            source={{ uri: item.coverImage }}
            style={[
              styles.playlistThumbnail,
              {
                transform: [{ scale: 1 }],
              },
            ]}
          />
          <View style={styles.playlistItemInfo}>
            <Text style={styles.playlistItemTitle}>{item.name}</Text>
            <Text style={styles.playlistItemStats}>
              {item.songs.length} albums • {item.duration}
            </Text>
          </View>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: containerFade,
          transform: [{ scale: containerScale }],
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Playlists</Text>
      </View>

      <ScrollView>
        {selectedPlaylist ? (
          <Animated.View
            style={styles.playlistDetail}
            entering={Animated.timing(containerFade, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            })}
          >
            <View style={styles.playlistHeader}>
              <Animated.Image
                source={{ uri: selectedPlaylist.coverImage }}
                style={[
                  styles.playlistCover,
                  {
                    transform: [{ scale: 1 }],
                  },
                ]}
              />
              <View style={styles.playlistInfo}>
                <Text style={styles.playlistTitle}>{selectedPlaylist.name}</Text>
                <Text style={styles.playlistStats}>
                  {selectedPlaylist.songs.length} albums • {selectedPlaylist.duration}
                </Text>
                <View style={styles.playlistActions}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.playButton,
                      { transform: [{ scale: pressed ? 0.95 : 1 }] },
                    ]}
                  >
                    <Play size={24} color="#fff" />
                    <Text style={styles.playButtonText}>Play All</Text>
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [
                      styles.moreButton,
                      { transform: [{ scale: pressed ? 0.9 : 1 }] },
                    ]}
                  >
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
              style={({ pressed }) => [
                styles.backButton,
                { transform: [{ scale: pressed ? 0.95 : 1 }] },
              ]}
              onPress={handleBackToPlaylists}
            >
              <Text style={styles.backButtonText}>Back to Playlists</Text>
            </Pressable>
          </Animated.View>
        ) : (
          <Animated.View>
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <Pressable
                style={({ pressed }) => [
                  styles.createPlaylistButton,
                  { transform: [{ scale: pressed ? 0.97 : 1 }] },
                ]}
                onPress={handleCreatePlaylist}
              >
                <Add size={24} color="#4682B4" />
                <Text style={styles.createPlaylistText}>Create New Playlist</Text>
              </Pressable>
            </Animated.View>

            <Text style={styles.sectionTitle}>Your Playlists</Text>
            <FlatList
              data={playlists}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={renderPlaylistItem}
            />
          </Animated.View>
        )}
      </ScrollView>
    </Animated.View>
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
