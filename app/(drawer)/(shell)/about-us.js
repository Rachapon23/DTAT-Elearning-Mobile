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
} from "react-native";
import Theme1 from "theme/Theme1";

const content = () => {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.text_title1}>CONTACT</Text>
          <Text style={styles.text_title2}>
            DENSO Training Academy Thailand (DTAT)
          </Text>
          <Text style={styles.text_title_sub}>
            Amata Nakorn Industrial Estate
          </Text>
          <Text style={styles.text_title_sub}>
            700/87 Moo 1, Bangna-Trad Rd., Km.57,
          </Text>
          <Text style={styles.text_title_sub}>
            T.Bankao, A.Panthong, Chonburi 20160 Thailand
          </Text>
          <Text style={styles.text_title_sub}>
            Tel: +66(0)-3821-4651 Nice-Net: (5062)-2808
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const AboutUs = () => {
  return <Theme1 content={content()} />;
};
export default AboutUs;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 20, alignItems: "center" },
  text_title1: { fontSize: 22, color: "#14347d" },
  text_title2: { fontSize: 18, color: "#14347d", marginTop: 10 },
  text_title_sub: { fontSize: 16, color: "#000", marginTop: 10 },
});
