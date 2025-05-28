import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Heart, ShoppingCart } from 'iconsax-react-native';
import { colors, fontType } from '../theme';

const ItemDetails = ({ album, onWishlistPress }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: album.image }} style={styles.albumImage} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.albumTitle}>{album.title}</Text>
        <Text style={styles.albumArtist}>{album.artist}</Text>
        <Text style={styles.albumYear}>Released: {album.year}</Text>

        <Text style={styles.description}>{album.description}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.wishlistButton} onPress={onWishlistPress}>
          <Heart size={24} color={colors.white()} variant="Bold" />
          <Text style={styles.buttonText}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton}>
          <ShoppingCart size={24} color={colors.white()} variant="Bold" />
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
    padding: 20,
    alignItems: 'center',
  },
  albumImage: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
    marginBottom: 20,
  },
  albumTitle: {
    fontSize: 24,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.blue(),
  },
  albumArtist: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(),
    marginBottom: 5,
  },
  albumYear: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.7),
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(0.8),
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
  },
  wishlistButton: {
    flexDirection: 'row',
    backgroundColor: colors.blue(),
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    gap: 5,
  },
  buyButton: {
    flexDirection: 'row',
    backgroundColor: colors.black(0.8),
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    gap: 5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.white(),
  },
});
