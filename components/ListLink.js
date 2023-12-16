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
  Linking,
  Alert,
  Platform
} from "react-native";
import React, { useState, useCallback } from "react";
import { Link, useRouter } from "expo-router";
import YoutubeIframe from "react-native-youtube-iframe";
import Ionicons from "react-native-vector-icons/Ionicons";
const WIDTH = Dimensions.get("window").width;

const ListLink = ({ item }) => {
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

  const openUrl = async (url) => {
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
      await Linking.openURL(url);
    }
    else {
      Alert.alert('This link not support');
    }
  }

  const Link_nomal = ({ item }) => (
    <Link href={`${item.link}`}>
      <TouchableOpacity onPress={() => { if (Platform.OS === 'ios') openUrl(item.link) }}>
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
  var youtobeRGEX =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm;
  if (youtobeRGEX.test(item?.link)) {
    return <Link_youtobe item={item} />;
  } else {
    return <Link_nomal item={item} />;
  }
};

export default ListLink;

const styles = StyleSheet.create({

  sub_content: {
    padding: 5,
  },
  link_text: {
    color: "#0275d8",
  },


});
