import { db } from './firebase';

// Fungsi untuk mendapatkan semua album
export const getAlbums = async () => {
  try {
    const snapshot = await db.collection('albums').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting albums:', error);
    throw error;
  }
};

// Fungsi untuk membuat album baru
export const createAlbum = async (albumData) => {
  try {
    const docRef = await db.collection('albums').add(albumData);
    return { id: docRef.id, ...albumData };
  } catch (error) {
    console.error('Error creating album:', error);
    throw error;
  }
};

// Fungsi untuk memperbarui album
export const updateAlbum = async (id, albumData) => {
  try {
    await db.collection('albums').doc(id).update(albumData);
    return { id, ...albumData };
  } catch (error) {
    console.error('Error updating album:', error);
    throw error;
  }
};

// Fungsi untuk menghapus album
export const deleteAlbum = async (id) => {
  try {
    await db.collection('albums').doc(id).delete();
  } catch (error) {
    console.error('Error deleting album:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan album berdasarkan ID
export const getAlbumById = async (id) => {
  try {
    const doc = await db.collection('albums').doc(id).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting album:', error);
    throw error;
  }
};