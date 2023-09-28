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
import Theme1 from "theme/Theme1";
import ListCourse from "components/ListCourse";

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
  // NOTE: if we use FlatList in ScrollView this error "VirtualizedLists should never be nested inside plain ScrollViews" will appear
  return (
    <SafeAreaView>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={styles.container}>
        <FlatList
              data={items}
              renderItem={({ item }) => <ListCourse item={item} to={`history/${item.id}`}/>}
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

const History = () => {
    return <Theme1 content={content()} />;
}

export default History;

const styles = StyleSheet.create({
  container: { padding: 10, marginTop: 20, alignItems: "center" },
});
