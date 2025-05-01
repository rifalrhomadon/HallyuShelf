import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Album, Playlist, Profile } from '../screens';
import { Home as HomeIcon, Music, Play, User } from 'iconsax-react-native';

const Tab = createBottomTabNavigator();

// Define icon components outside the render
const HomeTabIcon = ({ color, size }) => <HomeIcon size={size} color={color} variant="Bold" />;
const AlbumTabIcon = ({ color, size }) => <Music size={size} color={color} variant="Bold" />;
const PlaylistTabIcon = ({ color, size }) => <Play size={size} color={color} variant="Bold" />;
const ProfileTabIcon = ({ color, size }) => <User size={size} color={color} variant="Bold" />;

const NavigationBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4682B4',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tab.Screen
        name="Album"
        component={Album}
        options={{
          tabBarLabel: 'Albums',
          tabBarIcon: AlbumTabIcon,
        }}
      />
      <Tab.Screen
        name="Playlist"
        component={Playlist}
        options={{
          tabBarLabel: 'Playlist',
          tabBarIcon: PlaylistTabIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileTabIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationBar;
