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

const ListCourse = ({ item }) => {
  const width = Dimensions.get("window").width;
  return (
    <View>
      <TouchableOpacity
        style={[styles.box, { width: width }]}
        onPress={() => console.log("NEXT: ", item.id)}
      >
        <View style={styles.inbox}>
          <View style={{ height: "100%", width: "50%" }}>
            <Image
              source={require("../../public/student.webp")}
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
