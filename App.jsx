import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Album, Playlist, Forum, Profile } from './src/screens';
import AlbumDetails from './src/screens/AlbumDetails';
import AddAlbumForm from './src/screens/AddAlbumForm';
import EditAlbumForm from './src/screens/EditAlbumForm';
import { Home as HomeIcon, Music, Play, Message2, User } from 'iconsax-react-native';
import { AlbumProvider } from './src/contexts/AlbumContext';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/config/toastConfig';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4682B4',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <HomeIcon size={size} color={color} variant="Bold" />
          ),
        }}
      />
      <Tab.Screen
        name="Album"
        component={Album}
        options={{
          tabBarLabel: 'Album',
          tabBarIcon: ({ color, size }) => (
            <Music size={size} color={color} variant="Bold" />
          ),
        }}
      />
      <Tab.Screen
        name="Playlist"
        component={Playlist}
        options={{
          tabBarLabel: 'Playlist',
          tabBarIcon: ({ color, size }) => (
            <Play size={size} color={color} variant="Bold" />
          ),
        }}
      />
      <Tab.Screen
        name="Forum"
        component={Forum}
        options={{
          tabBarLabel: 'Forum',
          tabBarIcon: ({ color, size }) => (
            <Message2 size={size} color={color} variant="Bold" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} variant="Bold" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AlbumProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AlbumDetails"
            component={AlbumDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="AddAlbumForm" 
            component={AddAlbumForm} 
            options={{ title: 'Add New Album' }}
          />
          <Stack.Screen 
            name="EditAlbumForm" 
            component={EditAlbumForm} 
            options={{ title: 'Edit Album' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </AlbumProvider>
  );
}
