import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import React, { useState, useRef } from "react";
import { Link, Stack, useRouter } from "expo-router";

import { REACT_APP_IMG } from "@env";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const DEFAULT_IMAGE =
  "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png";

const ScreenHeaderButton = ({ text, to }) => {
  return (
    <Link href={to} asChild>
      <TouchableOpacity>
        <Text>{text}</Text>
      </TouchableOpacity>
    </Link>
  );
};

const CarouselCardItem = ({ item, index }) => {
  // console.log("ITEM",index,":: ",item?.image?.name)
  // console.log("ITEM URL:: ",REACT_APP_IMG+"/course/"+item?.image?.name)
  return (
    <View style={styles.container} key={index}>
      <View style={styles.course}>
        <Image
          source={{
            uri: item?.image?.name
              ? REACT_APP_IMG + "/course/" + item?.image?.name
              : DEFAULT_IMAGE,
          }}
          style={styles.image}
        />
        <Text style={styles.header}>{item.name}</Text>
        <Text style={styles.body}>{item.detail}</Text>
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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: "100%",
    height: (SLIDER_WIDTH - 10) / 1.7,
  },
  course: {
    borderRadius: 5,
    backgroundColor: "#fff",
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  header: {
    color: "#222",
    fontSize: 20,
    fontWeight: "500",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  body: {
    color: "#222",
    fontWeight: "300",
    fontSize: 16,
    paddingHorizontal: 15,
  },
});

const Slider = ({ items }) => {
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);

  return (
    <Link href={""}>
      <TouchableOpacity>
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
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </TouchableOpacity>
    </Link>
  );
};

export default Slider;
