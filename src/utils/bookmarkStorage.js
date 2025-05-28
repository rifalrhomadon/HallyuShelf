// src/utils/bookmarkStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'user_bookmarks';

export const getBookmarks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch bookmarks', e);
    return [];
  }
};

export const saveBookmarks = async (bookmarks) => {
  try {
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch (e) {
    console.error('Failed to save bookmarks', e);
  }
};

export const addBookmark = async (bookmark) => {
  const bookmarks = await getBookmarks();
  const newBookmark = {
    ...bookmark,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  await saveBookmarks([...bookmarks, newBookmark]);
  return newBookmark;
};

export const updateBookmark = async (id, updatedData) => {
  const bookmarks = await getBookmarks();
  const updatedBookmarks = bookmarks.map(item => 
    item.id === id ? {...item, ...updatedData, updatedAt: new Date().toISOString()} : item
  );
  await saveBookmarks(updatedBookmarks);
  return updatedBookmarks.find(item => item.id === id);
};

export const deleteBookmark = async (id) => {
  const bookmarks = await getBookmarks();
  const updatedBookmarks = bookmarks.filter(item => item.id !== id);
  await saveBookmarks(updatedBookmarks);
};

export const clearAllBookmarks = async () => {
  await AsyncStorage.removeItem(BOOKMARKS_KEY);
};