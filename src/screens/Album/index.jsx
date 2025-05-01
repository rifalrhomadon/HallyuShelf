import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { More } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { kpopAlbums } from '../../data';

const Album = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredAlbums = selectedTab === 'all'
    ? kpopAlbums
    : kpopAlbums.filter(album => album.type === selectedTab);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>K-Pop Albums</Text>
        <TouchableOpacity>
          <More size={24} color="#4682B4" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
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
      </View>

      {/* Album Grid */}
      <ScrollView contentContainerStyle={styles.albumGrid}>
        {filteredAlbums.map((album, index) => (
          <TouchableOpacity
            key={index}
            style={styles.albumCard}
            onPress={() => navigation.navigate('AlbumDetails', { album })}
          >
            <Image source={{ uri: album.cover }} style={styles.albumCover} />
            <Text style={styles.albumTitle} numberOfLines={1}>{album.title}</Text>
            <Text style={styles.albumArtist} numberOfLines={1}>{album.artist}</Text>
          </TouchableOpacity>
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
    width: '48%',
    marginBottom: 15,
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
