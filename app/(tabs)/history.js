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
import React from "react";
import Theme1 from "theme/Theme1";
import ListActivity from "components/ListActivity";
import useFetch from "../../hook/useFetch";

const content = () => {
  const { data, isLoading, error, refetch } = useFetch("list-activity?search=user:650d741a0056971b4f027af9&fetch=-ans,-__v&pops=path:course$select:name exam image type completed");

  const items = [
    {
      id: 1,
      title: "course 1",
      detail:
        "test course 1 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      src: "../../../public/4259647.jpg",
    },
    {
      id: 2,
      title: "course 2",
      detail:
        "test course 2 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      src: "../../../public/4259647.jpg",
    },
    {
      id: 3,
      title: "course 3",
      detail:
        "test course 3 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      src: "../../../public/4259647.jpg",
    },
  ];
  // NOTE: if we use FlatList in ScrollView this error "VirtualizedLists should never be nested inside plain ScrollViews" will appear
  return (
    <View>
      <SafeAreaView>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <View style={styles.container}>
            <FlatList
              data={data}
              renderItem={({ item }) => <ListActivity item={item} to={`course/${item?.course?._id}`} status_course={1}/>}
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

const History = () => {
    return <Theme1 content={content()} />;
}

export default History;

const styles = StyleSheet.create({
  container: { padding: 10, marginTop: 20, alignItems: "center" },
});
