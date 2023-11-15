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
  ActivityIndicator,

} from "react-native";
import React from "react";
import ListCourse from "components/ListCourse";
import Ionicons from "react-native-vector-icons/Ionicons";
import Theme1 from "theme/Theme1";
import useFetch from "../../hook/useFetch";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "expo-router";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
  data1,
  setData1,
  data2,
  setData2,
  setIsLoading
}) => {
  // setIsLoading(true)

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
              // setIsLoading(false)
            } else {
              setData2(data1);
              setSearchPhrase(event);
              // setIsLoading(false)
            }
          }}
          // onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
            // setIsLoading(false)

          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <TouchableOpacity
            onPress={() => {
              setData2(data1);
              setSearchPhrase("");
              // setIsLoading(false)

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
  const [isLoading, setIsLoading] = useState(true)

  const [course, setCourse] = useState([]);
  const [course2, setCourse2] = useState([]);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const fetch = useFetch();
  const router = useRouter();

  const navigate = (href) => {
    if (!href) return;
    // router.push(href);
    console.log(href)
  };

  const getData = async () => {
    const res = await fetch.fetchData({
      endpoint: `list-course?selects=name,detail,image,type`,
    });
    setCourse(res?.data);
    setCourse2(res?.data);
    if (res?.data) {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
              data1={course}
              setData1={setCourse}
              data2={course2}
              setData2={setCourse2}
              setIsLoading={setIsLoading}
            />
            {isLoading ? <View style={styles.loading}><ActivityIndicator size="large" color="#ffa69a" /></View>
              : <View>
                {course2.length >= 0 && course2?.map((item, index) => (
                  <ListCourse key={index} item={item} to={`enroll/${item?._id}`} />
                ))}
              </View>
            }
          </View>
        </ScrollView>
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
  loading: {
    height: HEIGHT - 300,
    justifyContent: "center",
    alignItems: "center",
  }
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
