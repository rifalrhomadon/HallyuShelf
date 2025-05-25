import { Edit, Play, Setting, Add } from "iconsax-react-native";
import { Image, Pressable, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { userProfile } from "../../data.jsx";
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: userProfile.profileImage }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userProfile.name}</Text>
          <Text style={styles.profileEmail}>{userProfile.email}</Text>
          <Text style={styles.profileJoinDate}>{userProfile.joinDate}</Text>
        </View>
        <Pressable style={styles.editButton}>
          <Edit size={20} color="#4682B4" />
        </Pressable>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userProfile.stats.albums}</Text>
          <Text style={styles.statLabel}>Albums</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userProfile.stats.playlists}</Text>
          <Text style={styles.statLabel}>Playlists</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userProfile.stats.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      {/* Favorite Artists */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Favorite Artists</Text>
          <Pressable>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.artistsContainer}>
          {userProfile.favoriteArtists.map((artist) => (
            <View key={artist.id} style={styles.artistCard}>
              <Image source={{ uri: artist.image }} style={styles.artistImage} />
              <Text style={styles.artistName}>{artist.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Recently Played */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          <Pressable>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>
        {userProfile.recentPlays.map((song) => (
          <Pressable key={song.id} style={styles.recentItem}>
            <Image source={{ uri: song.albumCover }} style={styles.recentImage} />
            <View style={styles.recentInfo}>
              <Text style={styles.recentTitle}>{song.title}</Text>
              <Text style={styles.recentArtist}>{song.artist}</Text>
            </View>
            <View style={styles.recentMeta}>
              <Text style={styles.recentTime}>{song.time}</Text>
              <Pressable style={styles.recentPlayButton}>
                <Play size={16} color="#4682B4" variant="Bold" />
              </Pressable>
            </View>
          </Pressable>
        ))}
      </View>

      {/* Settings Button */}
      <Pressable style={styles.settingsButton}>
        <Setting size={24} color="#4682B4" />
        <Text style={styles.settingsText}>Settings</Text>
      </Pressable>
      <TouchableOpacity 
        style={styles.addAlbumButton}
        onPress={() => navigation.navigate('AddAlbumForm')}
      >
        <Add size={20} color="#4682B4" />
        <Text style={styles.addAlbumButtonText}>Add Album</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Keep all your styles the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1A2E",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  profileJoinDate: {
    fontSize: 12,
    color: "#888",
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4682B4",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4682B4",
  },
  seeAll: {
    fontSize: 14,
    color: "#4682B4",
  },
  artistsContainer: {
    paddingRight: 20,
  },
  artistCard: {
    width: 100,
    marginRight: 15,
    alignItems: "center",
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  artistName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A1A2E",
    textAlign: "center",
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
  },
  recentImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 12,
  },
  recentInfo: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A2E",
    marginBottom: 4,
  },
  recentArtist: {
    fontSize: 14,
    color: "#666",
  },
  recentMeta: {
    alignItems: "flex-end",
  },
  recentTime: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
  },
  recentPlayButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f0f8ff",
    borderRadius: 10,
    marginVertical: 20,
    justifyContent: "center",
  },
  settingsText: {
    fontSize: 16,
    color: "#4682B4",
    fontWeight: "500",
    marginLeft: 10,
  },
  addAlbumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    marginBottom: 15,
  },
  addAlbumButtonText: {
    marginLeft: 10,
    color: '#4682B4',
    fontWeight: '500',
},
});

export default Profile;
