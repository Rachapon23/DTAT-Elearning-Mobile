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
  TouchableOpacity,
  Alert
} from "react-native";
import { REACT_APP_IMG } from "@env";
import { useEffect, useState } from "react";
import Theme1 from "theme/Theme1";
import ListTopic from "components/ListTopic";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const DEFAULT_IMAGE =
  "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png";

const content = () => {
  const { id } = useLocalSearchParams();
  const params = JSON.parse(`${id}`);

  const [course, setCourse] = useState([]);
  const [topics, setTopics] = useState([]);
  const [teacherProfile, setTeacherProfile] = useState();

  const fetch = useFetch();
  const router = useRouter();
  const navigate = (href) => {
    if (!href) return;
    router.push(href);
    // console.log(href)
  };
  const getData = async () => {
    const data = await fetch.fetchData({
      endpoint: `get-course/${params?.course}?pops=path:teacher$select:firstname lastname _id,path:exam$select:name`,
    });
    setCourse(data?.data);
    const topics = await fetch.fetchData({
      endpoint: `list-topic/course/${params?.course}`,
    });
    setTopics(topics);
    console.log("teacherProfile:", course?.teacher?._id)
    const teacher = await fetch.fetchData({
      endpoint: `get-profile/user/${course?.teacher?._id}`,
    });
    setTeacherProfile(teacher?.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const alertTeacher = () => {
    console.log(teacherProfile)
    Alert.alert('Teacher Profile',
      `Name: ${teacherProfile?.firstname} ${teacherProfile?.lastname}\nEmail: \nTel: ${teacherProfile?.tel}`
      ,
      [
        {
          text: 'OK', onPress: () => { }
        },
      ]);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={{
                uri: course?.image?.name
                  ? REACT_APP_IMG + "/course/" + course?.image?.name
                  : DEFAULT_IMAGE,
              }}
              style={styles.image}
            />
            <View style={styles.body}>
              <Text style={styles.text_1}>{course?.name}</Text>
              <Text style={styles.text_2}>{course?.detail}</Text>
              <TouchableOpacity onPress={alertTeacher}>
                <Text style={styles.text_3}>
                  By {course?.teacher?.firstname} {course?.teacher?.lastname}
                </Text>
              </TouchableOpacity>

            </View>
          </View>
          {course?.enabled ? (
            <View>
              {course?.exam?._id ? (
                <View style={styles.exam}>
                  <Text style={[styles.text_2, { marginBottom: 5, textAlign: "center" }]}>
                    Exam: {course?.exam?.name}
                  </Text>
                  <TouchableOpacity
                    style={[styles.toexam, { width: WIDTH - 40 }]}
                    onPress={() => {
                      navigate(`exam/{"exam":"${params?.exam}","activity":"${params?.activity}","course":"${params?.course}"}`);
                    }}
                  >
                    <Text style={styles.start}>Start</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )}
              {topics?.length > 0 ? <>
                {
                  topics?.map((item, index) => (
                    <ListTopic key={index} item={item} />
                  ))
                }
              </> : <View style={styles.course_disabled}>
                <Ionicons name={"warning-outline"} size={35} color={"gray"} />

                <Text>no content</Text>
              </View>}
            </View>
          ) : (
            <View style={styles.course_disabled}>
              <Ionicons name={"warning-outline"} size={35} color={"gray"} />

              <Text>Course Not Avaliable</Text>
            </View>
          )}
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
    marginBottom: 10,
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
  course_disabled: {
    height: HEIGHT - 500,
    justifyContent: "center",
    alignItems: "center",
  },
  exam: {
    backgroundColor: "rgba(159, 187, 246, 0.2)",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  toexam: {
    backgroundColor: "#0275d8",
    padding: 5,
    borderRadius: 5,
  },
  start: { color: "#fff", textAlign: "center" },
});
