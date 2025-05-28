import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Pressable, Image, TextInput, Animated, TouchableOpacity, RefreshControl } from 'react-native';
import { SearchNormal as SearchNormalIcon, ArrowLeft, Add, Heart, Message } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { forumData } from '../../data';

const Forum = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('trending');
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchAnim = useRef(new Animated.Value(0)).current;
  const [forumPosts] = useState(forumData);

  // Animasi toggle search
  const toggleSearch = () => {
    Animated.timing(searchAnim, {
      toValue: showSearch ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setShowSearch(!showSearch);
    if (showSearch) {setSearchQuery('');}
  };

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Render item untuk FlatList (TANPA HOOKS DI DALAMNYA)
  const renderItem = ({ item }) => {
    // Buat nilai animasi langsung tanpa useRef/useState
    const scaleValue = new Animated.Value(1);

    const onPressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.98,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Pressable
          style={styles.postContainer}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => navigation.navigate('ForumDetail', { post: item })}
        >
          <View style={styles.postHeader}>
            <Text style={styles.postCategory}>{item.category}</Text>
            <Text style={styles.postTimestamp}>{item.timestamp}</Text>
          </View>

          <View style={styles.postContent}>
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.postImage}
                resizeMode="cover"
              />
            )}
            <View style={styles.postText}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postPreview} numberOfLines={2}>
                {item.content}
              </Text>
            </View>
          </View>

          <View style={styles.postFooter}>
            <Text style={styles.postAuthor}>@{item.author}</Text>
            <View style={styles.postStats}>
              <View style={styles.statItem}>
                <Heart size={16} color="#ff4d4d" variant="Bold" />
                <Text style={styles.statText}>{item.likes}</Text>
              </View>
              <View style={styles.statItem}>
                <Message size={16} color="#4682B4" variant="Bold" />
                <Text style={styles.statText}>{item.comments}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    );
  };

  // Filter data dengan error handling
  const filteredData = forumPosts[activeTab]?.filter(post => {
    try {
      return (
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } catch (error) {
      console.error('Error filtering posts:', error);
      return false;
    }
  }) || [];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {showSearch ? (
          <Animated.View style={[styles.searchContainer, {
            width: searchAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          }]}>
            <TouchableOpacity onPress={toggleSearch}>
              <ArrowLeft size={24} color="#4682B4" />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Search discussions..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              placeholderTextColor="#999"
            />
          </Animated.View>
        ) : (
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>K-Pop Community</Text>
            <TouchableOpacity onPress={toggleSearch}>
              <SearchNormalIcon size={24} color="#4682B4" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Tab Navigation */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {['trending', 'albums', 'comebacks', 'favorites'].map((tab) => (
          <Pressable
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Forum Content */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4682B4']}
            tintColor="#4682B4"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No discussions found</Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreatePost')}
        activeOpacity={0.8}
      >
        <Add size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    backgroundColor: '#fff',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  tabsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#4682B4',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  listContainer: {
    padding: 15,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  postCategory: {
    color: '#4682B4',
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  postTimestamp: {
    color: '#999',
    fontSize: 12,
  },
  postContent: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  postImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },
  postText: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 5,
  },
  postPreview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  postAuthor: {
    color: '#4682B4',
    fontWeight: '500',
    fontSize: 13,
  },
  postStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  statText: {
    marginLeft: 5,
    fontSize: 13,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
  createButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4682B4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default Forum;
