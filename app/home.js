import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  Button,
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import useFetch from "../hook/useFetch";
import Theme1 from "../theme/Theme1";
import React, { useState } from "react";
// import Paginator from "./slider/Paginator";
import Slider_announce from "../components/Slider_announce";
import Slider_course from "../components/Slider_course";

const AboutButton = ({ text, to }) => {
  return (
    <Link href={to} asChild>
      <TouchableOpacity style={styles.button_aboutus}>
        <Text style={styles.text_aboutus}>{text}</Text>
      </TouchableOpacity>
    </Link>
  );
};

const Welcome = () => {
  const router = useRouter();
  const mock = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  return (
    <View>
      <Text style={{ fontWeight: "500", fontSize: 20 }}>
        {" "}
        Find Some Interesting Course{" "}
      </Text>

      <View
        style={{
          paddingTop: 10,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ width: "75%" }}>
          <TextInput
            style={{
              paddingVertical: 10,
              paddingHorizontal: 15,
              backgroundColor: "white",
              borderCurve: "circular",
              borderRadius: 5,
            }}
            value=""
            placeholder="Search Course"
          />
        </View>
        <View style={{ width: "20%" }}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderColor: "black",
              backgroundColor: "#33adff",
              height: "100%",
              borderRadius: 12,
            }}
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingTop: 10 }}>
        <FlatList
          data={mock}
          renderItem={({ item }) => (
            <View style={{ padding: 2 }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "black",
                  backgroundColor: "white",
                }}
                onPress={() => {
                  router.push(`/search/${item}`);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const PopularCourse = () => {
  const router = useRouter();
  const state = true;
  // const error = false;
  const mock = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  const { data, isLoading, error, refetch } = useFetch({ method: "GET", endpoint: "list-plant" });

  const displayData = () => {
    if (!state) return <ActivityIndicator size="large" />;
    if (error) return <Text> Something went wrong </Text>;
    return (
      <FlatList
        data={mock}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/details/${item}`)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    );
  };

  return (
    <View style={{ paddingTop: 10 }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "400" }}>Course</Text>
      </View>
      <View>{displayData()}</View>
    </View>
  );
};

const Home = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => <ScreenHeaderButton text="Menu" to="/learning" />,
          headerRight: () => (
            <ScreenHeaderButton text="Profile" to="/learning" />
          ),
          headerTitle: () => <ScreenHeaderButton text="LOGO" to="/home" />,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: 10 }}>
          <Welcome />
          <PopularCourse />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const content = () => {

  const { data, isLoading, error, refetch } = useFetch({ method: "GET", endpoint: "get-home" });
  const announce = data?.announce;
  const course_public = data?.course_public;
  const course_private = data?.course_private;
  const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  // console.log("announce:: ",data);
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.text_title}>DENSO Training Academy Thailand</Text>
          <Text style={styles.text_title_sub}>
            {" "}
            "Unlock Konwledge Anytime, Anywhere"{" "}
          </Text>
          <Text style={styles.text_title_sub}>
            {" "}
            "ปลดล็อกความรู้ ทุกที่ ทุกเวลา"{" "}
          </Text>
          <AboutButton text="About Us" to="/about-us" />
        </View>
        <View style={styles.view_slider}>
          <Slider_announce items={announce} />
        </View>
        <View style={styles.view_slider}>
          <Text style={styles.text_status_course}>Public Course</Text>
          <Slider_course items={course_public} />
        </View>
        <View style={styles.view_slider}>
          <Text style={styles.text_status_course}>Private Course</Text>
          <Slider_course items={course_private} />
        </View>
        <View style={{ height: 40, padding: 10 }}>
          <Text>version 1.0.0</Text>
        </View>
        {/* <PopularCourse/> */}
        {/* <Button title="Click" onPress={fat()}> */}
        {/* </Button> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const Home_logout = () => {
  const router = useRouter();
  return <Theme1 content={content()} />;
};
export default Home_logout;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 20, alignItems: "center" },
  text_title: { fontSize: 22, color: "#14347d" },
  text_status_course: {
    fontSize: 18,
    color: "#14347d",
    textAlign: "center",
    marginBottom: 10,
  },
  text_title_sub: { fontSize: 16, color: "#000", marginTop: 10 },
  view_slider: {
    marginTop: 20,
  },
  button_aboutus: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ffa69a",
    borderWidth: 1,
    borderRadius: 10,
    width: 200,
    height: 50,
    marginTop: 20,
  },
  text_aboutus: {
    color: "#ffa69a",
  },
});
