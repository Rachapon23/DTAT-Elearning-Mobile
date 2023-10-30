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
    <View style={styles.box}>
      <Text style={styles.title}>{item?.title}</Text>
      <View style={styles.date}>
        <Text>เริ่ม: {(item?.start).substring(0,10)}</Text>
        <Text>สิ้นสุด: {(item?.end).substring(0,10)}</Text>
        <View style={[styles.color, { backgroundColor: item?.color }]}/>
      </View>
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
  box: {
    backgroundColor: "rgba(159, 187, 246, 0.2)",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    width: WIDTH - 20,
  },
  color:{
    height:20,
    width:20,
    borderRadius:10,
  },
  date:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:5
  },
  title:{
    color: "#222",
    fontWeight: "400",
    fontSize: 16,
  }
});
