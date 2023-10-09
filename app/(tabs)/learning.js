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
import * as SecureStore from 'expo-secure-store';

const item = [
  {
    _id: "64a2c36a168482b1c49c4800",
    course: {
      image: {
        original_name: "course-pic1",
        name: "file-1686314592046-712090448.jpg",
        url: "/course/file-1686314592046-712090448.jpg"
      },
      _id: "64a2c36a168482b1c49c477b",
      name: "Introduction of Docker",
      type: true,
      exam: "64a2c36a168482b1c49c47f3"
    },
    completed: false,
    createdAt: "2023-07-03T12:47:38.221Z",
    progress: 0,
    result: 0,
    score_max: null,
    score_value: null,
    updatedAt: "2023-10-06T20:13:02.688Z",
    user: "64a2c369168482b1c49c4761"
  }
]

const content = () => {
  const fetch = useFetch();
  const [data, setData] = useState(null)

  const getData = async () => {
    const user = await SecureStore.getItemAsync('user_id')
    const res = await fetch.fetchData({ endpoint: `list-activity?search=user:${user}&fetch=-ans,-__v&pops=path:course$select:name exam image type completed` })
    setData(res.data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View>
      <SafeAreaView>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={({ item }) => <ListActivity item={item} to={`course/${item?.course?._id}`} status_course={0} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    </View>
  );
};

// const ScreenHeaderButton = ({ text, to }) => {
//     return (
//         <Link href={to} asChild >
//             <TouchableOpacity>
//                 <Text>{text}</Text>
//             </TouchableOpacity>
//         </Link>
//     )
// }

const Learning = () => {
  return <Theme1 content={content()} />;
};

export default Learning;

const styles = StyleSheet.create({
  container: { padding: 10, marginTop: 20, alignItems: "center" },
});
