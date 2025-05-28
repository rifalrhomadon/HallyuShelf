import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const ListHorizontal = ({ albums }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
      {albums.map((album, index) => (
        <View key={index} style={styles.albumCard}>
          <Image style={styles.albumImage} resizeMode="cover" source={{ uri: album.image }} />
          <Text style={styles.albumTitle}>{album.title}</Text>
          <Text style={styles.albumSubtitle}>Released: {album.year}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  horizontalScroll: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  albumCard: {
    backgroundColor: '#B0E0E6',
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  albumImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginTop: 5,
  },
  albumSubtitle: {
    fontSize: 14,
    color: '#1A1A2E',
  },
});

export default ListHorizontal;
