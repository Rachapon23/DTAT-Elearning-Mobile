import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import Theme1 from "../theme/Theme1";
import Slider from "../component/Slider";
import { Link, Stack, useRouter } from "expo-router";

const AboutButton = ({ text, to }) => {
  return (
    <Link href={to} asChild>
      <TouchableOpacity style={styles.button_aboutus}>
        <Text style={styles.text_aboutus}>{text}</Text>
      </TouchableOpacity>
    </Link>
  );
};

const content = () => {
  const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
//   const width = Dimensions.get("window").width;
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
          <Slider items={items}/>
        </View>
        <View style={styles.view_slider}>
            <Text style={styles.text_status_course}>Private Course</Text>
          <Slider items={items}/>
        </View>
        <View style={styles.view_slider}>
            <Text style={styles.text_status_course}>Public Course</Text>
          <Slider items={items}/>
        </View>
        <View style={{height:40,padding:10}}>
            <Text>version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const home = () => {
  return <Theme1 content={content()} />;
};

export default home;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 20, alignItems: "center" },
  text_title: { fontSize: 22, color: "#14347d" },
  text_status_course: { fontSize: 18, color: "#14347d" ,textAlign:"center",  marginBottom: 10, },
  text_title_sub: { fontSize: 16, color: "#000", marginTop: 10 },
  view_slider:{
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
