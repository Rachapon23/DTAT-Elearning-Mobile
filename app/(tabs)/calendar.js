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
import useFetch from "../../hook/useFetch";
import ListCalendar from "components/ListCalendar";

const content = () => {
  const { data, isLoading, error, refetch } = useFetch(`list-calendar-student`);
  const [selected, setSelected] = React.useState("");
  const WIDTH = Dimensions.get("window").width;
  console.log(data)
  return (
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
              markingType={"period"}
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
                "2023-10-01": {
                  startingDay: true,
                  color: "lightgreen",
                },
                "2023-10-02": {
                  marked: true,
                  color: "lightgreen",
                },
                "2023-10-03": {
                  endingDay: true,
                  marked: true,
                  color: "lightgreen",
                },
                "2023-10-20": {
                  startingDay: true,
                  color: "lightgreen",
                },
                "2023-10-21": {
                  marked: true,
                  color: "lightgreen",
                },
                "2023-10-22": {
                  endingDay: true,
                  marked: true,
                  color: "lightgreen",
                },
              }}
              style={[styles.calendar, { width: WIDTH - 20 }]}
            />
          </View>
          <View>
          <FlatList
              data={data}
              renderItem={({ item }) => <ListCalendar item={item}/>}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
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
    backgroundColor: "rgba(159, 187, 246, 0.2)",
    height: 320,
  },
});
