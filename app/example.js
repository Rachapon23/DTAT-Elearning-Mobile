import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Button,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  Keyboard,
  RefreshControl,
} from "react-native";
import { Link, Stack } from "expo-router";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useRef, useState, useCallback, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import YoutubeIframe from "react-native-youtube-iframe";
import useFetch from "hook/useFetch";
import axios from "axios";
import { REACT_APP_API, REACT_APP_IMG } from "@env";
import * as SecureStore from 'expo-secure-store';
import ImagePrivate from "components/ImagePrivate";
import { Video, ResizeMode } from "expo-av";

const SLIDER_WIDTH = Dimensions.get('window').width + 0
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9)

// const CarouselCardItem = ({ item, index }) => {
//   return (
//     <View style={styles.container} key={index}>
//       <Image
//         source={{ uri: item.imgUrl }}
//         style={styles.image}
//       />
//       <Text style={styles.header}>{item.title}</Text>
//       <Text style={styles.body}>{item.body}</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     width: ITEM_WIDTH,
//     paddingBottom: 40,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.29,
//     shadowRadius: 4.65,
//     elevation: 7,
//   },
//   image: {
//     width: ITEM_WIDTH,
//     height: 300,
//   },
//   header: {
//     color: "#222",
//     fontSize: 28,
//     fontWeight: "bold",
//     paddingLeft: 20,
//     paddingTop: 20
//   },
//   body: {
//     color: "#222",
//     fontSize: 18,
//     paddingLeft: 20,
//     paddingLeft: 20,
//     paddingRight: 20
//   }
// })

// -------------------------------------------------

// const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
//   return (
//     <View style={stylesSB.container}>
//       <View
//         style={
//           clicked
//             ? stylesSB.searchBar__clicked
//             : stylesSB.searchBar__unclicked
//         }
//       >
//         {/* search Icon */}
//         <Ionicons
//           name="search"
//           size={20}
//           style={{ paddingLeft: 15, paddingRight: 10 }}
//         />
//         {/* Input field */}
//         <TextInput
//           style={stylesSB.input}
//           placeholder="Search"
//           value={searchPhrase}
//           onChangeText={setSearchPhrase}
//           onFocus={() => {
//             setClicked(true);
//           }}
//         />
//         {/* cross Icon, depending on whether the search bar is clicked or not */}
//         {clicked && (
//           <TouchableOpacity onPress={() => setSearchPhrase("")} >
//             <Ionicons name="close" size={25} style={{ paddingRight: 10 }} />
//           </TouchableOpacity>
//         )}
//       </View>
//       {/* cancel button, depending on whether the search bar is clicked or not */}
//       {clicked && (
//         <View style={{ paddingHorizontal: 20 }} >
//           <TouchableOpacity
//             onPress={() => {
//               Keyboard.dismiss();
//               setClicked(false);
//             }}
//           >
//             <Text style={{ color: '#0093f5' }}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const stylesSB = StyleSheet.create({
//   container: {
//     margin: 15,
//     justifyContent: "flex-start",
//     alignItems: "center",
//     flexDirection: "row",
//     width: "90%",

//   },
//   searchBar__unclicked: {
//     padding: 10,
//     flexDirection: "row",
//     width: "95%",
//     backgroundColor: "#d9dbda",
//     borderRadius: 15,
//     alignItems: "center",
//   },
//   searchBar__clicked: {
//     padding: 10,
//     flexDirection: "row",
//     width: "80%",
//     backgroundColor: "#d9dbda",
//     borderRadius: 15,
//     alignItems: "center",
//     justifyContent: "space-evenly",
//   },
//   input: {
//     fontSize: 20,
//     marginLeft: 10,
//     width: "90%",
//   },
// });

// -------------------------------------------------

// const Youtube = () => {
//   const [playing, setPlaying] = useState(false);

//   const onStateChange = useCallback((state) => {
//     if (state === "ended") {
//       setPlaying(false);
//       Alert.alert("video has finished playing!");
//     }
//   }, []);

//   const togglePlaying = useCallback(() => {
//     setPlaying((prev) => !prev);
//   }, []);

//   return (
//     <View>
//       <YoutubeIframe
//         height={300}
//         play={playing}
//         videoId={"x7X9w_GIm1s"}
//         onChangeState={onStateChange}
//       />
//       <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
//     </View>
//   );
// }

// -------------------------------------------------

const GetPrivateFile = () => {
  const [data, setData] = useState(null)
  // const fetch = useFetch()

  const getFileToken = async () => {
    const token = await SecureStore.getItemAsync('file_token')
    setData(`${REACT_APP_IMG}/topic?file=file-1696956962579-795503552.png&token=${token}`)
  }

  // console.log(data)

  useEffect(() => {
    getFileToken()
  }, [])

  return (
    <View>
      <Image source={{ uri: data }} style={{ height: 200, width: 420 }} onError={(e) => console.log("ERROR", e.nativeEvent.error)} />
      <Text>{data}</Text>
    </View>
  )
}

// -------------------------------------------------

const Exmaple = () => {
  // const data = [
  //   {
  //     title: "Aenean leo",
  //     body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
  //     imgUrl: "https://picsum.photos/id/11/200/300",
  //   },
  //   {
  //     title: "In turpis",
  //     body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
  //     imgUrl: "https://picsum.photos/id/10/200/300",
  //   },
  //   {
  //     title: "Lorem Ipsum",
  //     body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
  //     imgUrl: "https://picsum.photos/id/12/200/300",
  //   },
  // ];
  const isCarousel = useRef(null)
  const [index, setIndex] = useState(0)
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const video = useRef(null);
  const [data, setData] = useState(null);
  const getFileToken = async () => {
    const token = await SecureStore.getItemAsync("file_token");
    setData(`${REACT_APP_IMG}/topic?file=${'file-1688393195045-697297649.mp4'}&token=${token}`);
  };
  useEffect(() => {
    getFileToken();
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const [text, setText] = useState("Before Refresh");
  const onRefresh = () => {
    setText("After Refresh call API");
  }

  return (
    <View style={{flex: 1}}>
      {/* <GetPrivateFile />  */}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Text>{text}</Text>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: data,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
      </ScrollView>
    </View>
    // <SafeAreaView>
    //   <ScrollView showsVerticalScrollIndicator={false}>
    //     <View style={{ borderRadius: 1, borderColor: 'black' }}>
    //       <Text>Search bar</Text>
    //       <Text>https://blog.logrocket.com/create-react-native-search-bar-from-scratch/</Text>
    //       < SearchBar
    //         searchPhrase={searchPhrase}
    //         setSearchPhrase={setSearchPhrase}
    //         clicked={clicked}
    //         setClicked={setClicked}
    //       />

    //       <Text>react-native-snap-carousel</Text>
    //       <Text>https://blog.logrocket.com/implement-react-native-snap-carousel/</Text>
    //       <Carousel
    //         layout="default"
    //         layoutCardOffset={9}
    //         ref={isCarousel}
    //         data={data}
    //         renderItem={CarouselCardItem}
    //         sliderWidth={SLIDER_WIDTH}
    //         itemWidth={ITEM_WIDTH}
    //         // inactiveSlideShift={0}
    //         onSnapToItem={(index) => setIndex(index)}
    //         useScrollView={true}
    //       />
    //       <Pagination
    //         dotsLength={data.length}
    //         activeDotIndex={index}
    //         carouselRef={isCarousel}
    //         dotStyle={{
    //           width: 10,
    //           height: 10,
    //           borderRadius: 5,
    //           marginHorizontal: 0,
    //           backgroundColor: 'rgba(0, 0, 0, 0.92)'
    //         }}
    //         inactiveDotOpacity={0.4}
    //         inactiveDotScale={0.6}
    //         tappableDots={true}
    //       />

    //       <Youtube />

    //       {/* <GetPrivateFile /> */}

    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

const WIDTH = Dimensions.get("window").width;
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


export default Exmaple;