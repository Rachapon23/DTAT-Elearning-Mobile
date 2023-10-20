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
import { useEffect, useState } from "react";
import Theme1 from "theme/Theme1";
import ListTopic from "components/ListTopic";

const WIDTH = Dimensions.get("window").width;
const DEFAULT_IMAGE =
  "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png";

const content = () => {
  const [teacherProfile, setTeacherProfile] = useState();
  const { id } = useLocalSearchParams();
  // const { data, isLoading, error, refetch } = useFetch({ endpoint: `get-course/${id}` });
  const [course, setCourse] = useState(null);
  const [topics, setTopics] = useState(null);

  const fetch = useFetch();

  const getData = async () => {
    const data = await fetch.fetchData({
      endpoint: `get-course/${id}?pops=path:teacher$select:firstname lastname _id,path:exam$select:name`,
    });
    console.log(data)
    await setCourse(data);
    const topics = await fetch.fetchData({
      endpoint: `list-topic/course/${id}`,
    });
    setTopics(topics);
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(course);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={{
                uri: course?.data?.image?.name
                  ? REACT_APP_IMG + "/course/" + course?.data?.image?.name
                  : DEFAULT_IMAGE,
              }}
              style={styles.image}
            />
            <View style={styles.body}>
              {/* <Text style={styles.text_1}>{course?.data?.name} {JSON.stringify(course?.data?.name)}</Text> */}
              <Text style={styles.text_1}>{course?.data?.name}</Text>
              <Text style={styles.text_2}>{course?.data?.detail}</Text>
              <Text style={styles.text_3}>
                By {course?.data?.teacher?.firstname}{" "}
                {course?.data?.teacher?.lastname}
              </Text>
            </View>
          </View>
          <View>
            {/* <FlatList
            style={{height:300}}
              data={topics}
              renderItem={({ item }) => <ListTopic item={item} />}
              showsVerticalScrollIndicator={false}
            /> */}
            {topics?.map((item,index)=>(
              <ListTopic key={index} item={item}/>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
