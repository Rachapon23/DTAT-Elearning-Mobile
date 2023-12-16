import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import cover_image from 'public/student.webp'
import { REACT_APP_IMG } from "@env";

const WIDTH = Dimensions.get("window").width;
const DEFAULT_IMAGE = cover_image;

const imgSrcSelector = (src = null) => {
  return src ? { uri: REACT_APP_IMG + "/course/" + src } : DEFAULT_IMAGE;
}

const ListCourse = ({ item, to = null }) => {

  const router = useRouter();
  const [coverImage, setCoverImage] = useState(imgSrcSelector(item?.image?.name));

  const navigate = (href) => {
    if (!href) return;
    router.push(href);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.box, { width: WIDTH - 20 }]}
        onPress={() => {
          navigate(to);
        }}
      >
        <View style={styles.inbox}>
          <View style={{ height: "100%", width: "50%" }}>
            <Image
              source={coverImage}
              style={styles.image}
              onError={() => setCoverImage(DEFAULT_IMAGE)}
            />
          </View>
          <View style={{ height: "100%", width: "50%", padding: 10 }}>
            <Text style={styles.header}>{item?.name}</Text>
            <View style={styles.badge}>
              <Text style={styles.body}>
                {item?.type ? "Public" : "Private"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListCourse;

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: WIDTH / 2 / 1.7,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inbox: {
    backgroundColor: "rgba(159, 187, 246, 0.2)",
    height: "100%",
    width: "100%",
    borderRadius: 5,
    flexDirection: "row",
  },
  image: {
    height: "100%",
    width: "100%",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  badge: {
    backgroundColor: "#fff",
    padding: 3,
    width: 60,
    borderRadius: 3,
  },
  header: {
    color: "#222",
    fontSize: 18,
    fontWeight: "500",
  },
  body: {
    color: "#222",
    fontWeight: "400",
    fontSize: 14,
  },
});
