import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  FlatList,
  Image,
} from "react-native";

import React, { useState, useRef } from "react";

const Slider = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const width = Dimensions.get("window").width;
  const renderItem = (item, index) => {
    const opacity = index == currentIndex ? 1 : 0.5;
    return (
      <View style={{paddingHorizontal:10}}>
        <Image
          style={[styles.Announce, { opacity: opacity, width: width-20 }]}
          source={require("public/student.webp")}
        />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item, index }) => renderItem(item, index)}
        horizontal
        showsVerticalScrollIndicator
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const totalWidth = event.nativeEvent.layoutMeasurement.width;
          const xPosition = event.nativeEvent.contentOffset.x;
          const newIndex = Math.round(xPosition / totalWidth);
          setCurrentIndex(newIndex);
        }}
      />
      <View style={styles.view_dot}>
        {items.map((item, index) => {
          const width = index == currentIndex ? 20 : 10;
          const color = index == currentIndex ? "#89ADF9" : "gray";
          const opacity = index == currentIndex ? 1 : 0.5;
          return (
            <View
              style={[
                styles.dot,
                { width: width, backgroundColor: color, opacity: opacity },
              ]}
              key={index}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  view_dot: {
    flexDirection: "row",
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  Announce: {},
});
