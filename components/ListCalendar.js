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

const WIDTH = Dimensions.get("window").width;

const ListCalendar = ({ item }) => {
  console.log(item)
  return (
    <View>
      <Text>{item?._id}</Text>
    </View>
  );
};

export default ListCalendar;

const styles = StyleSheet.create({
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
