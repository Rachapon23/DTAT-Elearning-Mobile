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
import React from "react";
import { usePathname, useSegments } from "expo-router";

const ListCourse = ({ item }) => {
  const width = Dimensions.get("window").width;
  const networkImage = { uri: "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"}
  const image = item?.src ? networkImage : require("public/student.webp")

  return (
    <View>
      <TouchableOpacity
        style={[styles.box, { width: width }]}
        onPress={() => console.log("NEXT: ", item.id)}
      >
        <View style={styles.inbox}>
          <View style={{ height: "100%", width: "50%" }}>
            <Image
              source={image}
              style={styles.image}
            />
          </View>
          <View style={{ height: "100%", width: "50%", paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
            <Text style={{ fontSize: 14 }}>{item.detail}</Text>
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
    height: 120,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inbox: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
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
});
