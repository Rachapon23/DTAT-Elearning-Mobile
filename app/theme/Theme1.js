import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";

const Theme1 = ({ content }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../public/background.jpg")}
        resizeMode="cover"
        style={styles.imageBackground}
        imageStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        {content}
      </ImageBackground>
    </View>
  );
};

export default Theme1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9fbbf6",
  },
  imageBackground: {
    flex: 1,
  },
});
