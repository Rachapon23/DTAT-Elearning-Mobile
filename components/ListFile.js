import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { REACT_APP_API, REACT_APP_IMG } from "@env";
import * as SecureStore from "expo-secure-store";
import { Video, ResizeMode } from "expo-av";
import { Link, useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
const WIDTH = Dimensions.get("window").width;

const TypeLink = ({ data }) => {
  return (
    <Link href={`${data}`}>
      <TouchableOpacity>
        <View style={styles.sub_content}>
          <Text style={styles.link_text}>
            <Ionicons name={"link-outline"} size={14} color={"#0275d8"} />{" "}
            {item?.original_name}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const TypeImage = ({ data }) => {
  return (
    <View>
      <Image
        source={{ uri: data }}
        style={styles.img}
        onError={(e) => console.log("ERROR", e.nativeEvent.error)}
      />
    </View>
  );
}

const TypeVideo = ({ data }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: data,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      {/* <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View> */}
    </View>
  );
}

const renderContent = (file_type, data) => {
  switch (file_type) {
    case 'image/png':
    case 'image/jpeg': return <TypeImage data={data} />
    case 'video/mp4': return <TypeVideo data={data}/>
    default: return <TypeLink data={data} />
  }
}

const ListFile = ({ item }) => {
  console.log("list item:", item);
  // console.log("list file")

  
  const GetPrivateFile = () => {
    const [data, setData] = useState(null);
    // const fetch = useFetch()


    const getFileToken = async () => {
      const token = await SecureStore.getItemAsync("file_token");
      setData(`${REACT_APP_IMG}/topic?file=${item?.name}&token=${token}`);
    };

    useEffect(() => {
      getFileToken();
    }, []);

    return renderContent(item?.file_type, data)
    
    if (item?.file_type == "image/jpeg" || item?.file_type == "image/png") {
      return (
        <View>
          <Image
            source={{ uri: data }}
            style={styles.img}
            onError={(e) => console.log("ERROR", e.nativeEvent.error)}
          />
        </View>
      );
    } else if (item?.file_type == "video/mp4") {
      return (
        <View style={styles.container}>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: data,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View style={styles.buttons}>
            <Button
              title={status.isPlaying ? "Pause" : "Play"}
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
            />
          </View>
        </View>
      );
    } else {
      return (
        <Link href={`${data}`}>
          <TouchableOpacity>
            <View style={styles.sub_content}>
              <Text style={styles.link_text}>
                <Ionicons name={"link-outline"} size={14} color={"#0275d8"} />{" "}
                {item?.original_name}
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      );
    }
  };

  return (
    <View>
      <GetPrivateFile />
    </View>
  );
};

export default ListFile;

const styles = StyleSheet.create({
  img: { height: (WIDTH - 40) / 1.7, width: WIDTH - 40, marginBottom: 10 },
  container: {},
  video: { height: (WIDTH - 40) / 1.7, width: WIDTH - 40, marginBottom: 10 },
  buttons: {},
  sub_content: {
    padding: 5,
  },
  link_text: {
    color: "#0275d8",
  },
});
