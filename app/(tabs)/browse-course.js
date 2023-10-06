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
  Keyboard,
} from "react-native";
import React from "react";
import ListCourse from "components/ListCourse";
import Ionicons from "react-native-vector-icons/Ionicons";
import Theme1 from "theme/Theme1";
import useFetch from "../../hook/useFetchBrow";
import { useRef, useState, useEffect } from "react";

const WIDTH = Dimensions.get("window").width;
const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
  data1,
  setData1,
  data2,
  setData2,
}) => {
  return (
    <View style={stylesSB.container}>
      <View
        style={
          clicked ? stylesSB.searchBar__clicked : stylesSB.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Ionicons
          name="search"
          size={20}
          style={{ paddingLeft: 15, paddingRight: 10 }}
        />
        {/* Input field */}
        <TextInput
          style={stylesSB.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={(event) => {
            if (event) {
              const newData = data1.filter(function (item) {
                const itemData = item?.name
                  ? item?.name.toUpperCase()
                  : "".toUpperCase();
                const textData = event.toUpperCase();
                return itemData.indexOf(textData) > -1;
              });
              setData2(newData);
              setSearchPhrase(event);
            } else {
              setData2(data1);
              setSearchPhrase(event);
            }
          }}
          // onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <TouchableOpacity
            onPress={() => {
              setData2(data1);
              setSearchPhrase("");
            }}
          >
            <Ionicons name="close" size={25} style={{ paddingRight: 10 }} />
          </TouchableOpacity>
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            onPress={() => {
              // setData2(data1);
              // setSearchPhrase("");
              Keyboard.dismiss();
              setClicked(false);
            }}
          >
            <Text style={{ color: "#0093f5" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const content = () => {
  const { data1, setData1, data2, setData2, isLoading, error, refetch } = useFetch(
    
  );

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

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
  // to={`/enroll/${item.id}`}
  // NOTE: if we use FlatList in ScrollView this error "VirtualizedLists should never be nested inside plain ScrollViews" will appear
  return (
    <View>
      <SafeAreaView>
        <View style={styles.container}>
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
            data1={data1}
            setData1={setData1}
            data2={data2}
            setData2={setData2}
          />
          <View style={{ marginBottom: 60 }}>
            <FlatList
              data={data2}
              renderItem={({ item }) => (
                <ListCourse item={item} to={`/enroll/${item?._id}`} />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const BrowseCourse = () => {
  return <Theme1 content={content()} />;
};

export default BrowseCourse;

const styles = StyleSheet.create({
  container: { padding: 10, marginTop: 20, alignItems: "center" },
});

const stylesSB = StyleSheet.create({
  container: {
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    // backgroundColor: "red",
    padding: 10,
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "rgba(217, 219, 218, 0.3)",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "rgba(217, 219, 218, 0.5)",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 20,
    width: "80%",
  },
});
