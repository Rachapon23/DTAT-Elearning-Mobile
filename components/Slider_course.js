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
import React, { useState, useRef, useEffect } from "react";
import { Link, Stack, useRouter } from "expo-router";
import { REACT_APP_IMG } from "@env";
import cover_image from 'public/student.webp'
import * as SecureStore from "expo-secure-store";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const DEFAULT_IMAGE = cover_image;

const imgSrcSelector = (src = null) => {
  return src ? { uri: REACT_APP_IMG + "/course/" + src } : DEFAULT_IMAGE;
}

const getStorageValue = async (key) => {
  const value = await SecureStore.getItemAsync(key);
  if (value) {
    return value
  }
  return null;
}

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
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [coverImage, setCoverImage] = useState(imgSrcSelector(items ? items[index]?.image?.name : null));

  const CarouselCardItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={handleTouchEnd}>
        <View style={styles.container} key={index}>
          <View style={styles.course}>
            <Image
              source={coverImage}
              style={styles.image}
              onError={() => setCoverImage(DEFAULT_IMAGE)}
            />
            <Text style={styles.header}>{item.name}</Text>
            <Text style={styles.body}>{item.detail}</Text>
          </View>
        </View>
      </TouchableOpacity>

    );
  };


  const checkLogin = async () => {
    const token = await getStorageValue("token");
    const role = await getStorageValue("role");
    const firstname = await getStorageValue("firstname")
    const lastname = await getStorageValue("lastname")
    const employee = await getStorageValue("employee")
    setIsLoggedIn(
      token !== null &&
      firstname !== null &&
      firstname !== null &&
      lastname !== null &&
      employee !== null &&
      role !== null
    );
  }

  const navigate = (href) => {
    if (!href) return;
    router.push(href);
  };

  const handleTouchEnd = (e) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate(`/enroll/${items[index]?._id}`);
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])

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
      // onTouchEnd={handleTouchEnd}
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
    </View>

  );
};

export default Slider;
