import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { More } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { useAlbums } from '../../contexts/AlbumContext';

const Album = () => {
  const navigation = useNavigation();
  const { albums } = useAlbums();
  const [selectedTab, setSelectedTab] = useState('all');
  // Animation values
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-20)).current;
  const tabOpacity = useRef(new Animated.Value(0)).current;
  const tabTranslateY = useRef(new Animated.Value(20)).current;
  const itemOpacity = useRef(new Animated.Value(0)).current;
  const itemScale = useRef(new Animated.Value(0.9)).current;

  const filteredAlbums = selectedTab === 'all'
    ? albums
    : albums.filter(album => album.type === selectedTab);

  // Initialize animations
  useEffect(() => {
    Animated.sequence([
      // Header animation
      Animated.parallel([
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(headerTranslateY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      // Tab bar animation
      Animated.parallel([
        Animated.timing(tabOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(tabTranslateY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      // Album items animation
      Animated.parallel([
        Animated.timing(itemOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(itemScale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [headerOpacity, headerTranslateY, itemOpacity, itemScale, tabOpacity, tabTranslateY]);

  // Re-animate when tab changes
  useEffect(() => {
    itemOpacity.setValue(0);
    itemScale.setValue(0.9);

    Animated.parallel([
      Animated.timing(itemOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(itemScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, [itemOpacity, itemScale, selectedTab]);

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[
        styles.header,
        {
          opacity: headerOpacity,
          transform: [{ translateY: headerTranslateY }],
        },
      ]}>
        <Text style={styles.headerTitle}>K-Pop Albums</Text>
        <TouchableOpacity>
          <More size={24} color="#4682B4" />
        </TouchableOpacity>
      </Animated.View>

      {/* Animated Tab Bar */}
      <Animated.View style={[
        styles.tabContainer,
        {
          opacity: tabOpacity,
          transform: [{ translateY: tabTranslateY }],
        },
      ]}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'all' && styles.activeTab]}
          onPress={() => setSelectedTab('all')}
        >
          <Text style={[styles.tabText, selectedTab === 'all' && styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'girl-group' && styles.activeTab]}
          onPress={() => setSelectedTab('girl-group')}
        >
          <Text style={[styles.tabText, selectedTab === 'girl-group' && styles.activeTabText]}>Girl Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'boy-group' && styles.activeTab]}
          onPress={() => setSelectedTab('boy-group')}
        >
          <Text style={[styles.tabText, selectedTab === 'boy-group' && styles.activeTabText]}>Boy Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'solo' && styles.activeTab]}
          onPress={() => setSelectedTab('solo')}
        >
          <Text style={[styles.tabText, selectedTab === 'solo' && styles.activeTabText]}>Solo</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Album Grid with Animation */}
      <ScrollView contentContainerStyle={styles.albumGrid}>
        {filteredAlbums.map((album, index) => (
          <Animated.View
            key={index}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              opacity: itemOpacity,
              transform: [{ scale: itemScale }],
              width: '48%', // Preserve original width
              marginBottom: 15, // Preserve original margin
            }}
          >
            <TouchableOpacity
              style={styles.albumCard}
              onPress={() => navigation.navigate('AlbumDetails', { album })}
            >
              <Image
                source={{ uri: album.cover }}
                style={styles.albumCover} // Original cover style preserved
              />
              <Text style={styles.albumTitle} numberOfLines={1}>{album.title}</Text>
              <Text style={styles.albumArtist} numberOfLines={1}>{album.artist}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4682B4',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: '#4682B4',
  },
  tabText: {
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  albumGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  albumCard: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  albumCover: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
    paddingHorizontal: 5,
  },
  albumArtist: {
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
});

export default Album;