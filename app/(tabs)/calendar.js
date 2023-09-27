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
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Theme1 from "theme/Theme1";
import { Calendar, LocaleConfig } from "react-native-calendars";

const content = () => {
  const [selected, setSelected] = React.useState("");
  const width = Dimensions.get("window").width;
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View
            style={{
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Calendar
              onDayPress={(day) => {
                setSelected(day.dateString);
              }}
              
              markingType={'period'}
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
                "2023-09-01": {
                  startingDay: true,
                  color: "lightgreen",
                },
                "2023-09-02": {
                  marked: true,
                  color: "lightgreen",
                },
                "2023-09-03": {
                  endingDay: true,
                  marked: true,
                  color: "lightgreen",
                },
                "2023-09-20": {
                  startingDay: true,
                  color: "lightgreen",
                },
                "2023-09-21": {
                  marked: true,
                  color: "lightgreen",
                },
                "2023-09-22": {
                  endingDay: true,
                  marked: true,
                  color: "lightgreen",
                },
              }}
              style={[styles.calendar, { width: width - 20 }]}
            />
          </View>
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

const Calendar1 = () => {
  return <Theme1 content={content()} />;
};

export default Calendar1;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 20, alignItems: "center" },
  calendar: {
    borderRadius: 5,
    backgroundColor: "rgba(128,128,128, 0.1)",
    height: 320,
  },
});
