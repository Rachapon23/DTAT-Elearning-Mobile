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
  Dimensions,
} from "react-native";
import React from "react";
import ListCourse from "components/ListCourse";
import Ionicons from "react-native-vector-icons/Ionicons";
import Theme1 from "theme/Theme1";

const content = () => {
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

  const width = Dimensions.get("window").width;

  // NOTE: if we use FlatList in ScrollView this error "VirtualizedLists should never be nested inside plain ScrollViews" will appear
  return (
    <SafeAreaView>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View style={styles.container}>
        <View
          style={{ paddingHorizontal: 20, marginBottom: 20, width: width }}
        >
          <View style={styles.searchview}>
            <Ionicons
              name={"search-outline"}
              size={20}
              color={"gray"}
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={styles.inputsearch}
              placeholder="search"
            ></TextInput>
          </View>
        </View>
        <FlatList
          data={items}
          renderItem={({ item }) => <ListCourse item={item} to={`/enroll/${item.id}`} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
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

const BrowseCourse = () => {
  return <Theme1 content={content()} />;
};

export default BrowseCourse;

const styles = StyleSheet.create({
  container: { padding: 10, marginTop: 20, alignItems: "center" },
  searchview: {
    borderColor: "#000",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  inputsearch: {
    width: "100%",
    height: 40,
  },
});
