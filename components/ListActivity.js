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
import { useRouter } from "expo-router";
import { REACT_APP_IMG } from "@env";

const WIDTH = Dimensions.get("window").width;
const DEFAULT_IMAGE =
  "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png";

const ListCourse = ({ item, to = null,status_course }) => {

  const router = useRouter();

  const navigate = (href) => {
    if (!href) return;
    router.push(href);
  };
  // console.log(item)
  if (status_course == 0 && item?.result == 0) {
    return (
      <View>
        <TouchableOpacity
          style={[styles.box, { width: WIDTH - 20 }]}
          onPress={() => {
            // console.log("NEXT: ", item?._id);
            navigate(to);
          }}
        >
          <View style={styles.inbox}>
            <View style={{ height: "100%", width: "50%" }}>
              <Image
                source={{
                  uri: item?.course?.image?.name
                    ? REACT_APP_IMG + "/course/" + item?.course?.image?.name
                    : DEFAULT_IMAGE,
                }}
                style={styles.image}
              />
            </View>
            <View style={{ height: "100%", width: "50%", padding: 10 }}>
              <Text style={styles.header}>{item?.course?.name}</Text>
              <View style={styles.badge}>
                <Text style={styles.body}>
                  {item?.course?.type ? "Public" : "Private"}
                </Text>
              </View>
              {/* <Text style={styles.body}>{item?.result}</Text> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }else if(status_course == 1 && item?.result >= 1){
    return (
      <View>
        <TouchableOpacity
          style={[styles.box, { width: WIDTH - 20 }]}
          onPress={() => {
            // console.log("NEXT: ", item?._id);
            navigate(to);
          }}
        >
          <View style={styles.inbox}>
            <View style={{ height: "100%", width: "50%" }}>
              <Image
                source={{
                  uri: item?.course?.image?.name
                    ? REACT_APP_IMG + "/course/" + item?.course?.image?.name
                    : DEFAULT_IMAGE,
                }}
                style={styles.image}
              />
            </View>
            <View style={{ height: "100%", width: "50%", padding: 10 }}>
              <Text style={styles.header}>{item?.course?.name}</Text>
              <View style={styles.badge}>
                <Text style={styles.body}>
                  {item?.course?.type ? "Public" : "Private"}
                </Text>
              </View>
              {/* <Text style={styles.body}>{item?.result}</Text> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return;
  }
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
