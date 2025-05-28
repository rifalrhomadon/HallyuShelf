import { AddSquare, ArrowLeft, Calendar, Clock, Location, Profile } from "iconsax-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, fontType } from "../../theme";
import { getBookmarks } from "../../utils/bookmarkStorage";

// Komponen Kartu Bookmark
const BookmarkCard = ({ item, index, navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("BookmarkDetail", { trainingData: item })}
    >
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: colors.white(),
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, { color: colors.blueDark() }]}>{item.title}</Text>

          <View style={styles.cardInfo}>
            <Profile size={16} color={colors.blue()} variant="Linear" />
            <Text style={styles.cardText}>{item.coach}</Text>
          </View>

          <View style={styles.cardInfo}>
            <Calendar size={16} color={colors.blue()} variant="Linear" />
            <Text style={styles.cardText}>{item.date}</Text>
          </View>

          <View style={styles.cardInfo}>
            <Clock size={16} color={colors.blue()} variant="Linear" />
            <Text style={styles.cardText}>{item.time}</Text>
          </View>

          <View style={styles.cardInfo}>
            <Location size={16} color={colors.blue()} variant="Linear" />
            <Text style={styles.cardText}>{item.location}</Text>
          </View>

          <View
            style={[
              styles.levelBadge,
              {
                backgroundColor:
                  item.level === "Pemula"
                    ? colors.blueLight(0.3)
                    : item.level === "Lanjutan"
                    ? colors.blue(0.2)
                    : colors.blueDark(0.2),
              },
            ]}
          >
            <Text
              style={[
                styles.levelText,
                {
                  color:
                    item.level === "Pemula"
                      ? colors.blueDark()
                      : item.level === "Lanjutan"
                      ? colors.blue()
                      : colors.white(),
                },
              ]}
            >
              {item.level}
            </Text>
          </View>

          <TouchableOpacity style={[styles.cancelButton, { backgroundColor: colors.blueLight(0.3) }]}>
            <Text style={[styles.cancelButtonText, { color: colors.blueDark() }]}>
              Batalkan Jadwal
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Komponen utama Bookmark
const Bookmark = ({ navigation }) => {
  const [trainingSchedule, setTrainingSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const bookmarks = await getBookmarks();
        setTrainingSchedule(bookmarks ?? []);
      } catch (error) {
        console.error("Failed to load bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
  }, []);

  const refreshBookmarks = async () => {
    setLoading(true);
    try {
      const bookmarks = await getBookmarks();
      setTrainingSchedule(bookmarks ?? []);
    } catch (error) {
      console.error("Failed to refresh bookmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.blueLight(0.1) }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.blueDark() }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.white()} variant="Linear" size={24} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.white() }]}>Jadwal Saya</Text>
        <View style={{ width: 24 }} />
        <Pressable style={styles.addButton} onPress={() => navigation.navigate("AddBookmarkForm")}>
          <AddSquare size={24} color={colors.white()} />
        </Pressable>
      </View>

      {/* Konten */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {trainingSchedule.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 40, color: colors.grey() }}>
              Belum ada jadwal disimpan
            </Text>
          ) : (
            trainingSchedule.map((item, index) => (
              <BookmarkCard key={item.id} item={item} index={index} navigation={navigation} />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingTop: 10,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: fontType["Pjs-Bold"],
  },
  list: {
    paddingVertical: 16,
    gap: 16,
  },
  card: {
    marginHorizontal: 24,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    marginBottom: 8,
  },
  cardImage: {
    width: "100%",
    height: 160,
  },
  cardContent: {
    padding: 16,
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: fontType["Pjs-Bold"],
    marginBottom: 4,
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardText: {
    fontSize: 12,
    fontFamily: fontType["Pjs-Regular"],
    color: colors.grey(0.8),
  },
  levelBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },
  levelText: {
    fontSize: 12,
    fontFamily: fontType["Pjs-SemiBold"],
  },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: fontType["Pjs-semiBold"],
  },
  addButton: {
  position: "absolute",
  bottom: 30,
  right: 30,
  backgroundColor: colors.blueDark(),
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: "center",
  alignItems: "center",
  elevation: 5,
  zIndex: 10, // Pastikan lebih tinggi dari konten lain
},
});
