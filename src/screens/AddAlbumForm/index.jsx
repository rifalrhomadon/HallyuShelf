import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { ArrowLeft, Add } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useAlbums } from '../../contexts/AlbumContext';
import Toast from 'react-native-toast-message';

const AddAlbumForm = () => {
  const navigation = useNavigation();
  const { addAlbum } = useAlbums();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    cover: '',
    releaseDate: '',
    description: '',
    type: 'girl-group',
  });
  const [songs, setSongs] = useState([{ title: '', duration: '' }]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSongChange = (index, field, value) => {
    const updatedSongs = [...songs];
    updatedSongs[index][field] = value;
    setSongs(updatedSongs);
  };

  const addSongField = () => {
    setSongs([...songs, { title: '', duration: '' }]);
  };

  const removeSongField = (index) => {
    if (songs.length > 1) {
      const updatedSongs = [...songs];
      updatedSongs.splice(index, 1);
      setSongs(updatedSongs);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        handleChange('cover', result.assets[0].uri);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Image Picker Error',
        text2: error.message,
      });
    }
  };

  const isValidDate = (dateStr) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.artist || !formData.releaseDate) {
      Toast.show({
        type: 'error',
        text1: 'Missing required fields',
        text2: 'Please fill in title, artist, and release date.',
      });
      return;
    }

    if (!isValidDate(formData.releaseDate)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Date Format',
        text2: 'Use format YYYY-MM-DD',
      });
      return;
    }

    setIsLoading(true);
    try {
      const albumData = {
        ...formData,
        songs: songs.filter(song => song.title.trim() && song.duration.trim()),
        isLiked: false,
      };
      await addAlbum(albumData);

      Toast.show({
        type: 'success',
        text1: 'Album added successfully!',
        visibilityTime: 2000,
      });

      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to add album',
        text2: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add New Album</Text>
        <TouchableOpacity onPress={handleSubmit} disabled={isLoading}>
          <Text style={styles.submitButton}>{isLoading ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.coverContainer} onPress={pickImage}>
          {formData.cover ? (
            <Image source={{ uri: formData.cover }} style={styles.coverImage} />
          ) : (
            <View style={styles.coverPlaceholder}>
              <Add size={24} color="#4682B4" />
              <Text style={styles.coverPlaceholderText}>Add Cover</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Album Title"
          value={formData.title}
          onChangeText={(text) => handleChange('title', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Artist"
          value={formData.artist}
          onChangeText={(text) => handleChange('artist', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Release Date (e.g., 2023-09-13)"
          value={formData.releaseDate}
          onChangeText={(text) => handleChange('releaseDate', text)}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Album Description"
          multiline
          numberOfLines={4}
          value={formData.description}
          onChangeText={(text) => handleChange('description', text)}
        />

        <View style={styles.typeContainer}>
          <Text style={styles.typeLabel}>Album Type:</Text>
          <View style={styles.typeOptions}>
            {['girl-group', 'boy-group', 'solo'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeOption,
                  formData.type === type && styles.typeOptionSelected,
                ]}
                onPress={() => handleChange('type', type)}
              >
                <Text
                  style={[
                    styles.typeOptionText,
                    formData.type === type && styles.typeOptionTextSelected,
                  ]}
                >
                  {type === 'girl-group' ? 'Girl Group' : type === 'boy-group' ? 'Boy Group' : 'Solo'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Songs</Text>
        {songs.map((song, index) => (
          <View key={index} style={styles.songContainer}>
            <TextInput
              style={[styles.input, styles.songInput]}
              placeholder={`Song ${index + 1} Title`}
              value={song.title}
              onChangeText={(text) => handleSongChange(index, 'title', text)}
            />
            <TextInput
              style={[styles.input, styles.songInput, styles.durationInput]}
              placeholder="Duration (e.g., 3:45)"
              value={song.duration}
              onChangeText={(text) => handleSongChange(index, 'duration', text)}
            />
            {songs.length > 1 && (
              <TouchableOpacity
                style={styles.removeSongButton}
                onPress={() => removeSongField(index)}
              >
                <Text style={styles.removeSongButtonText}>×</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity style={styles.addSongButton} onPress={addSongField}>
          <Add size={20} color="#4682B4" />
          <Text style={styles.addSongButtonText}>Add Song</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4682B4',
  },
  submitButton: {
    fontSize: 16,
    color: '#4682B4',
    fontWeight: '500',
  },
  formContainer: {
    padding: 20,
  },
  coverContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  coverImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  coverPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 8,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4682B4',
    borderStyle: 'dashed',
  },
  coverPlaceholderText: {
    marginTop: 10,
    color: '#4682B4',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  typeContainer: {
    marginBottom: 20,
  },
  typeLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  typeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  typeOptionSelected: {
    backgroundColor: '#4682B4',
  },
  typeOptionText: {
    color: '#666',
  },
  typeOptionTextSelected: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4682B4',
    marginBottom: 15,
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  songInput: {
    flex: 1,
  },
  durationInput: {
    width: 100,
  },
  removeSongButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffecec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeSongButtonText: {
    color: '#ff6b6b',
    fontSize: 18,
    lineHeight: 20,
  },
  addSongButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    marginTop: 10,
  },
  addSongButtonText: {
    marginLeft: 5,
    color: '#4682B4',
    fontWeight: '500',
  },
});

export default AddAlbumForm;
