import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  FlatList,
  Image,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import React, { useState, useRef, useEffect  } from "react";
import { REACT_APP_IMG } from "@env";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"

const CarouselCardItem = ({ item, index }) => {
  console.log("ITEM URL:: ", REACT_APP_IMG + item?.url )

  return (
    <View style={styles.container} key={index}>
      <View style={styles.shadow}>
        <Image
          source={{ uri: item?.url ? REACT_APP_IMG + item?.url : DEFAULT_IMAGE}}
          style={styles.image}
        />
        {/* <Text style={styles.header}>{item.title}</Text> */}
        {/* <Text style={styles.body}>{item.body}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    width: "100%",
    padding: 10,
  },
  image: {
    borderRadius: 5,
    width: "100%",
    height: (SLIDER_WIDTH - 10) / 2.63,
  },
  shadow: {
    // padding: 1,
    // backgroundColor: "red",
    // width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});

const Slider = ({ items }) => {
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={items}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={SLIDER_WIDTH}
        // inactiveSlideShift={0}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
        <Pagination
          dotsLength={items?.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: "rgba(0, 0, 0, 0.92)",
          }}
          // containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' ,padding:0 ,}}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
    </View>
  );
};

export default Slider;
