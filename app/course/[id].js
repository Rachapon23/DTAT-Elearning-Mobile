import { useLocalSearchParams } from "expo-router";
import useFetch from "../../hook/useFetch";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { REACT_APP_IMG } from "@env";
import { useState } from "react";
import Theme1 from "theme/Theme1";

const WIDTH = Dimensions.get("window").width;
const DEFAULT_IMAGE =
  "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png";

const content = () => {
  const [teacherProfile, setTeacherProfile] = useState();
  const { id } = useLocalSearchParams();
  const { data, isLoading, error, refetch } = useFetch({ endpoint: `get-course/${id}` });
  if (data) {
    console.log(data?.teacher);
    // const { data2, isLoading2, error2 } = useFetch(
    //   `get-profile/user/${data?.teacher}`
    // );
    // setTeacherProfile(data2);
  }
  //   const { dataToppic, isLoading3, error3, refetch3 } = useFetch(`get-course/${id}`);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: data?.image?.name
              ? REACT_APP_IMG + "/course/" + data?.image?.name
              : DEFAULT_IMAGE,
          }}
          style={styles.image}
        />
        <View style={styles.body}>
          <Text style={styles.text_1}>{data?.name}</Text>
          <Text style={styles.text_2}>{data?.detail}</Text>
          <Text style={styles.text_3}>
            By {data?.teacher}
            {/* By {teacherProfile?.firstname} {teacherProfile?.lastname} */}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.text_3}>TOPIC :: {data?.topic}</Text>
      </View>
    </View>
  );
};

const Course = () => {
  return <Theme1 content={content()} />;
};

export default Course;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    backgroundColor: "rgba(159, 187, 246, 0.2)",
    paddingBottom: 20,
    borderRadius: 5,
  },
  body: {
    padding: 10,
  },
  image: {
    height: (WIDTH - 20) / 1.7,
    width: WIDTH - 20,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  text_1: {
    color: "#222",
    fontSize: 18,
    fontWeight: "500",
  },
  text_2: {
    color: "#222",
    fontWeight: "400",
    fontSize: 14,
  },
  text_3: {
    color: "#0275d8",
    fontWeight: "400",
    fontSize: 14,
    marginTop: 10,
  },
});
