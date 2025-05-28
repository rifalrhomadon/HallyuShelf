import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView, Alert, Image,
  TouchableWithoutFeedback, Keyboard, StyleSheet
} from 'react-native';
import { ArrowLeft, Calendar, Clock, Location, AddSquare } from 'iconsax-react-native';
import * as ImagePicker from 'expo-image-picker';
import { addBookmark } from '../../utils/bookmarkStorage';
import { colors, fontType } from '../../theme';

const AddBookmarkForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    title: '',
    coach: '',
    date: '',
    time: '',
    location: '',
    level: 'Pemula',
    image: null,
    description: ''
  });

  const levels = ['Pemula', 'Menengah', 'Lanjutan'];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please allow access to your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setFormData({ ...formData, image: result.assets[0].uri });
    }
  };

  const handleSubmit = async () => {
    const { title, coach, date, time, location } = formData;

    if (!title || !coach || !date || !time || !location) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    try {
      await addBookmark(formData);
      Alert.alert('Success', 'Training schedule added successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add training schedule');
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.white()} />
        </Pressable>
        <Text style={styles.title}>Add Training Schedule</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.imageUpload} onPress={pickImage}>
          {formData.image ? (
            <Image source={{ uri: formData.image }} style={styles.imagePreview} />
          ) : (
            <>
              <AddSquare size={40} color={colors.blue()} />
              <Text style={styles.imageUploadText}>Add Training Image</Text>
            </>
          )}
        </Pressable>

        {[
          ['Training Title *', 'title', 'Enter training title'],
          ['Coach *', 'coach', 'Enter coach name'],
          ['Date *', 'date', 'DD/MM/YYYY', <Calendar size={20} color={colors.blue()} />],
          ['Time *', 'time', 'HH:MM AM/PM', <Clock size={20} color={colors.blue()} />],
          ['Location *', 'location', 'Enter location', <Location size={20} color={colors.blue()} />],
        ].map(([label, key, placeholder, icon]) => (
          <View key={key} style={{ marginBottom: 16 }}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputWrapper}>
              {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
              <TextInput
                style={[styles.input, icon && { flex: 1 }]}
                placeholder={placeholder}
                value={formData[key]}
                onChangeText={(text) => setFormData({ ...formData, [key]: text })}
              />
            </View>
          </View>
        ))}

        <Text style={styles.label}>Difficulty Level *</Text>
        <View style={styles.levelContainer}>
          {levels.map(level => (
            <Pressable
              key={level}
              style={[
                styles.levelButton,
                formData.level === level && styles.activeLevelButton(level)
              ]}
              onPress={() => setFormData({ ...formData, level })}
            >
              <Text style={[
                styles.levelText,
                formData.level === level && styles.activeLevelText(level)
              ]}>
                {level}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Enter training description"
          multiline
          numberOfLines={4}
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
        />

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Schedule</Text>
        </Pressable>

        {/* Extra padding at the bottom to ensure all content can be scrolled */}
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: colors.blueDark(),
  },
  title: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.white(),
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 24,
  },
  imageUpload: {
    height: 180,
    backgroundColor: colors.blueLight(0.1),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.blueLight(0.5),
    borderStyle: 'dashed',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  imageUploadText: {
    fontFamily: fontType['Pjs-Medium'],
    color: colors.blue(),
    marginTop: 10,
  },
  label: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    color: colors.blueDark(),
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blueLight(0.1),
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  input: {
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 14,
    color: colors.blueDark(),
    paddingVertical: 12,
    flex: 1,
  },
  levelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  levelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.blueLight(0.5),
  },
  activeLevelButton: (level) => ({
    backgroundColor:
      level === 'Pemula' ? colors.blueLight(0.3) :
      level === 'Menengah' ? colors.blue(0.2) :
      colors.blueDark(0.2),
    borderColor: 'transparent',
  }),
  levelText: {
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 14,
    color: colors.blueDark(),
  },
  activeLevelText: (level) => ({
    color:
      level === 'Pemula' ? colors.blueDark() :
      level === 'Menengah' ? colors.blue() :
      colors.white(),
  }),
  submitButton: {
    backgroundColor: colors.blueDark(),
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontFamily: fontType['Pjs-Bold'],
    color: colors.white(),
    fontSize: 16,
  },
});

export default AddBookmarkForm;