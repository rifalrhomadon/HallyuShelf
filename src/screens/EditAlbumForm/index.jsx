import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { ArrowLeft, Save, Trash } from 'iconsax-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { updateAlbum, deleteAlbum } from '../../Services/api';

const EditAlbumForm = () => {
  const navigation = useNavigation();
  const { params: { album } } = useRoute();
  const [formData, setFormData] = useState(album);
  const [songs, setSongs] = useState(album.songs);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData(album);
    setSongs(album.songs);
  }, [album]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange('cover', result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const albumData = {
        ...formData,
        songs: songs.filter(song => song.title && song.duration),
      };
      await updateAlbum(album.id, albumData);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating album:', error);
      alert('Failed to update album. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteAlbum(album.id);
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting album:', error);
      alert('Failed to delete album. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#4682B4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Album</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleDelete} disabled={isLoading} style={styles.deleteButton}>
            <Trash size={20} color="#ff6b6b" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} disabled={isLoading}>
            <Save size={24} color="#4682B4" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formContainer}>
        {/* Album Cover */}
        <TouchableOpacity style={styles.coverContainer} onPress={pickImage}>
          {formData.cover ? (
            <Image source={{ uri: formData.cover }} style={styles.coverImage} />
          ) : (
            <View style={styles.coverPlaceholder}>
              <Text style={styles.coverPlaceholderText}>Change Cover</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Album Info */}
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

        {/* Album Type */}
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

        {/* Songs */}
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
          <Text style={styles.addSongButtonText}>Add Song</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Reuse the same styles from AddAlbumForm
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  deleteButton: {
    padding: 5,
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
    color: '#4682B4',
    fontWeight: '500',
  },
});

export default EditAlbumForm;