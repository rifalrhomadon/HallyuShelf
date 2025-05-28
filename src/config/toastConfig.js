import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export const toastConfig = {
  success: ({ text1, props, ...rest }) => (
    <View style={{ 
      backgroundColor: '#4BB543', 
      padding: 15, 
      borderRadius: 8,
      marginHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <Icon name="checkmark-circle" size={20} color="white" />
      <Text style={{ color: 'white', marginLeft: 10 }}>{text1}</Text>
    </View>
  ),
  error: ({ text1, props, ...rest }) => (
    <View style={{ 
      backgroundColor: '#FF3333', 
      padding: 15, 
      borderRadius: 8,
      marginHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <CloseCircle size={20} color="white" />
      <Text style={{ color: 'white', marginLeft: 10 }}>{text1}</Text>
    </View>
  )
};

export const toastStyles = {
  success: {
    backgroundColor: '#4BB543',
    borderRadius: 8,
    padding: 15,
    width: '90%',
  },
  error: {
    backgroundColor: '#FF3333',
    borderRadius: 8,
    padding: 15,
    width: '90%',
  },
  text1: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text2: {
    color: 'white',
    fontSize: 14,
  }
  
};
