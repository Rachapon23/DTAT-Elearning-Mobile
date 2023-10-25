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
import React, { useEffect, useState } from "react";
import Theme1 from "theme/Theme1";
import ListActivity from "components/ListActivity";
import useFetch from "../../hook/useFetch";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";

const HEIGHT = Dimensions.get("window").height;
const content = () => {
  const fetch = useFetch();
  const [activity, setActivity] = useState([]);
  const [nodata, setNodata] = useState([]);

  const getData = async () => {
    const user = await SecureStore.getItemAsync("user_id");
    const res = await fetch.fetchData({
      endpoint: `list-activity?search=user:${user}&fetch=-ans,-__v&pops=path:course$select:name exam image type completed`,
    });
    setActivity(res?.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const istrue = (currentValue) => currentValue === true;

  return (
    <View>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {activity.length <= 0 ? (
              <View style={styles.data_empty}>
                <Ionicons name={"file-tray-outline"} size={35} color={"gray"} />
                <Text>no data</Text>
              </View>
            ) : (
              <View>
                {activity?.map((item, index) => {
                  if (item?.result !== 0) {
                    nodata.push(true)
                    return (
                      <ListActivity
                        key={index}
                        item={item}
                        course={`${item?.course?._id}`}
                        exam={`${item?.course?.exam}`}
                        activity={`${item?._id}`}
                      />
                    )
                  } else { nodata.push(false) }
                })}
                {nodata.every(istrue) ? <></> : <View style={styles.data_empty}>
                  <Ionicons name={"file-tray-outline"} size={35} color={"gray"} />
                  <Text>no data</Text>
                </View>}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};


const History = () => {
  return <Theme1 content={content()} />;
}

export default History;

const styles = StyleSheet.create({
  container: { padding: 10, marginTop: 20, alignItems: "center" },
  data_empty: {
    height: HEIGHT - 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
