import { View, Text, Image } from "react-native";
import React from "react";
import useFetch from "../hook/useFetchTest_image";
const Display_file = ({ item }) => {
  const DEFAULT_IMAGE =
    "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png";

  const createFileField = "topic";
  const createFileParam = "file";

  const { image, error } = useFetch(
    `/get-image/private/${createFileField}?${createFileParam}=${item?.name}`
    ,`${item.file_type}`
  );
//   let imageUri = URL.createObjectURL(image)
  return (
    <View style={{}}>
      {/* <Text style={{}}>{item.name}</Text> */}
      <Text style={{}}>IMAG:: {image}</Text>
      <Image
        source={{
          uri: image ? image : DEFAULT_IMAGE,
        }}
        //   style={styles.image}
      />
    </View>
  );
};

export default Display_file;
