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
    {
      id: 4,
      title: "course 4",
      detail:
        "test course 4 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      src: "../../../public/4259647.jpg",
    },
    {
      id: 5,
      title: "course 5",
      detail:
        "test course 5 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      src: "../../../public/4259647.jpg",
    },
    {
      id: 6,
      title: "course 6",
      detail:
        "test course 6 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      src: "../../../public/4259647.jpg",
    },
    {
      id: 7,
      title: "course 7",
      detail:
        "test course 7 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      src: "../../../public/4259647.jpg",
    },
    {
      id: 8,
      title: "course 8",
      detail:
        "test course 8 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      src: "../../../public/4259647.jpg",
    },
    {
      id: 9,
      title: "course 9",
      detail:
        "test course 9 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      src: "../../../public/4259647.jpg",
    },
  ];
// console.log("DATA: ",data)
  // NOTE: if we use FlatList in ScrollView this error "VirtualizedLists should never be nested inside plain ScrollViews" will appear
  return (
    <View>
      <SafeAreaView>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <View style={styles.container}>
            <FlatList
              data={data}
              renderItem={({ item }) => <ListActivity item={item} to={`course/${item?.course?._id}`} status_course={0}/>}
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
