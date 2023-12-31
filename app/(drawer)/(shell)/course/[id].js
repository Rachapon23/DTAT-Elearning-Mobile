import { useLocalSearchParams } from "expo-router";
import useFetch from "hook/useFetch";
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
  Alert,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { REACT_APP_IMG } from "@env";
import { useEffect, useState } from "react";
import Theme1 from "theme/Theme1";
import ListTopic from "components/ListTopic";
import Ionicons from "react-native-vector-icons/Ionicons";
import cover_image from 'public/student.webp'
import { useRouter } from "expo-router";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const DEFAULT_IMAGE = cover_image;

const imgSrcSelector = (src = null) => {
  return src ? { uri: REACT_APP_IMG + "/course/" + src } : DEFAULT_IMAGE;
}

const content = () => {
  const { id } = useLocalSearchParams();
  const params = JSON.parse(`${id}`);

  const [course, setCourse] = useState([]);
  const [topics, setTopics] = useState([]);
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [coverImage, setCoverImage] = useState(imgSrcSelector(course ? course?.image?.name : null));

  const fetch = useFetch();
  const router = useRouter();

  const navigate = (href) => {
    if (!href) return;
    router.push(href);
  };

  const getData = async () => {
    const course = await fetch.fetchData({
      endpoint: `get-course/${params?.course}?pops=path:teacher$select:firstname lastname _id,path:exam$select:name`,
    });
    setCourse(course?.data);

    const topics = await fetch.fetchData({
      endpoint: `list-topic/course/${params?.course}`,
    });
    setTopics(topics);

    console.log("teacherProfile:", course?.data?.teacher?._id)
    const teacher = await fetch.fetchData({
      endpoint: `get-profile/user/${course?.data?.teacher?._id}`,
    });
    setTeacherProfile(teacher?.data);

    if (topics) {
      setIsLoading(false)
    }
  };

  const onRefresh = () => {
    getData()
  }

  useEffect(() => {
    getData();
  }, []);

  const alertTeacher = () => {
    if (teacherProfile) {
      Alert.alert('Teacher Profile',
        `Name: ${teacherProfile?.firstname} ${teacherProfile?.lastname}\nEmail: \nTel: ${teacherProfile?.tel}`
        ,
        [
          {
            text: 'OK', onPress: () => { }
          },
        ]);
    }

  }

  return (
    <SafeAreaView>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {isLoading ? <View style={styles.loading}><ActivityIndicator size="large" color="#ffa69a" /></View>
          : <View style={styles.container}>
            <View style={styles.header}>
              <Image
                source={coverImage}
                style={styles.image}
                onError={() => setCoverImage(DEFAULT_IMAGE)}
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
        }
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
  loading: {
    height: HEIGHT - 200,
    justifyContent: "center",
    alignItems: "center",
  }
});
