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
import React, { useState, useCallback } from "react";

import { Link, useRouter } from "expo-router";
import { REACT_APP_IMG } from "@env";
import Ionicons from "react-native-vector-icons/Ionicons";

import ListLink from "./ListLink";
import ListFile from "./ListFile";

const WIDTH = Dimensions.get("window").width;
const DEFAULT_IMAGE =
  "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png";

const ListTopic = ({ item }) => {

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.details}> &nbsp; &nbsp;{item.detail}</Text>
      
        <View>
          {item?.sub_content?.length >= 0 && item?.sub_content?.map((item, index) => (
            <View key={index} style={styles.sub_content}>
              <Text style={styles.sub_text}>
                <View style={styles.dot} /> {item}
              </Text>
            </View>
          ))}
        </View>
      
        <View>
          {item?.link?.length >= 0 && item?.link?.map((item, index) => (<ListLink key={index} item={item}/>))}
        </View>

        <View>
          {item?.file?.length >= 0 && item?.file?.map((item, index) => (<ListFile key={index} item={item}/>))}
        </View>

    </View>
  );
};

export default ListTopic;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(159, 187, 246, 0.2)",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  sub_content: {
    padding: 5,
  },
  link_text: {
    color: "#0275d8",
  },
  sub_text: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    height: 5,
    width: 5,
    backgroundColor: "#000",
    borderRadius: 2.5,
  },
  image: {
    height: "100%",
    width: "100%",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  title: {
    color: "#222",
    fontSize: 18,
    fontWeight: "500",
  },
  details: {
    color: "#222",
    fontWeight: "400",
    fontSize: 14,
  },
});
