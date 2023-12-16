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
import React, { useState, useRef, useEffect } from "react";
import cover_image from 'public/student.webp'
import { REACT_APP_IMG } from "@env";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const DEFAULT_IMAGE = cover_image;

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
  default_card: {
    borderRadius: 5,
    width: "100%",
    height: (SLIDER_WIDTH - 10) / 2.63,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#a7cae8'
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

const imgSrcSelector = (src = null) => {
  return src ? { uri: REACT_APP_IMG + src } : DEFAULT_IMAGE;
}

const Slider = ({ items }) => {
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);
  const [coverImage, setCoverImage] = useState(imgSrcSelector(items ? items[index]?.url : null));

  const CardSelector = (img = null) => {
    if (img) {
      return (
        <Image
          source={coverImage}
          style={styles.image}
          onError={() => setCoverImage(DEFAULT_IMAGE)}
        />
      )
    }

    return (
      <View style={styles.default_card}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}> No Announce</Text>
      </View>
    )
  }


  const CarouselCardItem = ({ item, index }) => {
    return (
      <View style={styles.container} key={index}>
        <View style={styles.shadow}>
          {/* <Image
            source={{ uri: item?.url ? REACT_APP_IMG + item?.url : DEFAULT_IMAGE }}
            style={styles.image}
          /> */}
          {CardSelector(coverImage)}
          {/* <Text style={styles.header}>{item.title}</Text> */}
          {/* <Text style={styles.body}>{item.body}</Text> */}
        </View>
      </View>
    );
  };

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
