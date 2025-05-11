import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Pressable, FlatList, Animated, Easing } from 'react-native';
import { SearchNormal } from 'iconsax-react-native';
import { newReleases, recommendedAlbums } from '../../data.jsx';
import ListHorizontal from '../../components/ListHorizontal.jsx';
import ItemSmall from '../../components/ItemSmall.jsx';

const AnimatedHeader = ({ headerOpacity, headerTranslateY }) => (
  <Animated.View style={[
    styles.header,
    {
      opacity: headerOpacity,
      transform: [{ translateY: headerTranslateY }],
    },
  ]}>
    <Text style={styles.title}>HallyuSelf</Text>
  </Animated.View>
);

const AnimatedSearchBar = ({ searchBarScale, searchQuery, setSearchQuery }) => (
  <Animated.View style={[
    styles.searchBarWrapper,
    { transform: [{ scale: searchBarScale }] },
  ]}>
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
  </Animated.View>
);

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-20)).current;
  const searchBarScale = useRef(new Animated.Value(0.8)).current;
  const titleFade = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(headerTranslateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(searchBarScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(titleFade, {
        toValue: 1,
        duration: 300,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 500,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [headerOpacity, headerTranslateY, searchBarScale, titleFade, contentFade]); // Tambahkan semua dependencies

  return (
    <View style={styles.container}>
      <AnimatedHeader
        headerOpacity={headerOpacity}
        headerTranslateY={headerTranslateY}
      />
      <AnimatedSearchBar
        searchBarScale={searchBarScale}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <ScrollView>
        <Animated.View style={{ opacity: titleFade }}>
          <Text style={styles.sectionTitle}>New Releases</Text>
        </Animated.View>
        <Animated.View style={{ opacity: contentFade }}>
          <ListHorizontal albums={newReleases} />
        </Animated.View>

        <Animated.View style={{ opacity: titleFade }}>
          <Text style={styles.sectionTitle}>Recommended Albums</Text>
        </Animated.View>
        <Animated.View style={{ opacity: contentFade }}>
          <FlatList
            data={recommendedAlbums}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <ItemSmall album={item} />}
          />
        </Animated.View>
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
