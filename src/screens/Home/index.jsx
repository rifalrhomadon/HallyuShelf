import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Pressable, FlatList } from 'react-native';
import { SearchNormal } from 'iconsax-react-native';
import { newReleases, recommendedAlbums } from '../../data.jsx';
import ListHorizontal from '../../components/ListHorizontal.jsx';
import ItemSmall from '../../components/ItemSmall.jsx';

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <ScrollView>
        <Text style={styles.sectionTitle}>New Releases</Text>
        <ListHorizontal albums={newReleases} />

        <Text style={styles.sectionTitle}>Recommended Albums</Text>
        <FlatList
          data={recommendedAlbums}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ItemSmall album={item} />}
        />
      </ScrollView>
    </View>
  );
};

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>HallyuSelf</Text>
  </View>
);

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <View style={styles.searchBarWrapper}>
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for magical albums..."
        placeholderTextColor={'#BFA3DA'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Pressable style={styles.searchButton}>
        <SearchNormal size={24} color={'#fff'} />
      </Pressable>
    </View>
  </View>
);

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
  searchBarWrapper: {
    paddingHorizontal: 20,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#87CEFA',
    borderRadius: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: '#1A1A2E',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#4682B4',
    padding: 10,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4682B4',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default Home;
