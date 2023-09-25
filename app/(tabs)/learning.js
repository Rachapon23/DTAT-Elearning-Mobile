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
} from "react-native";
import React from "react";
import Theme1 from "../theme/Theme1";

const content = () => {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text>learning</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// const ScreenHeaderButton = ({ text, to }) => {
//     return (
//         <Link href={to} asChild >
//             <TouchableOpacity>
//                 <Text>{text}</Text>
//             </TouchableOpacity>
//         </Link>
//     )
// }

const Learning = () => {
    return <Theme1 content={content()} />;
}

export default Learning;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 20, alignItems: "center" },
});
