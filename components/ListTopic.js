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
import YoutubeIframe from "react-native-youtube-iframe";
import Display_file from "./Display_file";

const WIDTH = Dimensions.get("window").width;
const DEFAULT_IMAGE =
  "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png";

const ListTopic = ({ item }) => {
  const [playing, setPlaying] = useState(false);
  const onSateShange = useCallback((state) => {
    if (state === "endes") {
      setPlaying(false);
    } else if (state === "playing") {
      setPlaying(true);
    } else if (state === "paused") {
      setPlaying(false);
    }
  }, []);

  function getIDfromURL(url) {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return "";
    }
  }

  const Link_nomal = ({ item }) => (
    <Link href={`${item.link}`}>
      <TouchableOpacity>
        <View style={styles.sub_content}>
          <Text style={styles.link_text}>
            <Ionicons name={"link-outline"} size={14} color={"#0275d8"} />{" "}
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  const Link_youtobe = ({ item }) => {
    let youtobe_id = getIDfromURL(item?.link);
    return (
      <View style={styles.sub_content}>
        <YoutubeIframe
          height={(WIDTH - 40) / 1.78}
          width={WIDTH - 50}
          play={playing}
          onChangeState={onSateShange}
          videoId={youtobe_id}
        />
      </View>
    );
  };

  // console.log(item);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.details}>{item.detail}</Text>
      <FlatList
        data={item?.sub_content}
        renderItem={({ item }) => (
          <View style={styles.sub_content}>
            <Text style={styles.sub_text}>
              <View style={styles.dot} /> {item}
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
      <FlatList
        data={item?.link}
        renderItem={({ item }) => {
          var youtobeRGEX =
            /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm;
          if (youtobeRGEX.test(item?.link)) {
            return <Link_youtobe item={item} />;
          } else {
            return <Link_nomal item={item} />;
          }
        }}
        showsVerticalScrollIndicator={false}
      />
      <FlatList
        data={item?.file}
        renderItem={({ item }) => <Display_file item={item}/>}
        showsVerticalScrollIndicator={false}
      />
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
  //   box: {
  //     width: "100%",
  //     height: WIDTH / 2 / 1.7,
  //     marginBottom: 20,
  //     paddingHorizontal: 10,
  //   },
  //   inbox: {
  //     backgroundColor: "rgba(159, 187, 246, 0.2)",
  //     height: "100%",
  //     width: "100%",
  //     borderRadius: 5,
  //     flexDirection: "row",
  //   },
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
