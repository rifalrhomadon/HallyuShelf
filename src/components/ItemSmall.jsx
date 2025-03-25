import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ItemSmall = ({ album }) => {
  return (
    <View style={styles.albumRow}>
      <Image style={styles.albumImage} source={{ uri: album.image }} />
      <View style={styles.albumInfo}>
        <Text style={styles.albumTitle}>{album.title}</Text>
        <Text style={styles.albumSubtitle}>Released: {album.year}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  albumRow: {
    flexDirection: 'row',
    backgroundColor: '#E0FFFF',
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    alignItems: 'center',
  },
  albumImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  albumInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },
  albumSubtitle: {
    fontSize: 14,
    color: '#1A1A2E',
  },
});

export default ItemSmall;
