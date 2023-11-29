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
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import Theme1 from "theme/Theme1";
import { Calendar, LocaleConfig } from "react-native-calendars";
import useFetch from "hook/useFetch";
import ListCalendar from "components/ListCalendar";

const content = () => {
  const fetch = useFetch();
  const WIDTH = Dimensions.get("window").width;
  const [evens, setEvens] = useState([]);
  const [evenRender, setEvenRender] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  var getDaysArray = function (start, end) {
    for (var arr = [], dt = new Date(start); dt < new Date(end); dt.setDate(dt.getDate() + 1)) {
      let date_new = dt
      let day = date_new.getDate() < 10 ? "0" + date_new.getDate() : date_new.getDate();
      let month = Number(date_new.getMonth()) + 1 < 10 ? "0" + String(Number(date_new.getMonth()) + 1) : Number(date_new.getMonth()) + 1;
      let year = date_new.getFullYear();
      let format4 = year + "-" + month + "-" + day;
      arr.push(format4);
    }
    return arr;
  };

  const getData = async () => {
    const data = await fetch.fetchData({ endpoint: `list-calendar-student` });
    setEvens(data)
    let obj = {}

    for (let i = 0; i < data.length; i++) {
      let daylist = getDaysArray(new Date(data[i]?.start), new Date(data[i]?.end));
      for (let j = 0; j < daylist.length; j++) {
        if (j == 0) {
          if ([`${daylist[j]}`] in obj) {
            obj[`${daylist[j]}`]['periods'].push(
              {
                startingDay: true,
                color: data[i]?.color,
                // name: even[i]?.title
              }
            )
          } else {
            obj[`${daylist[j]}`] = {}
            if (!("periods" in obj[`${daylist[j]}`])) {
              obj[`${daylist[j]}`]['periods'] = [
                {
                  startingDay: true,
                  color: data[i]?.color,
                  // name: even[i]?.title
                }
              ]
            }
          }
        } else if (j == daylist.length - 1) {
          if ([`${daylist[j]}`] in obj) {
            obj[`${daylist[j]}`]['periods'].push(
              {
                endingDay: true,
                color: data[i]?.color,
                // name: even[i]?.title
              }
            )
          } else {
            obj[`${daylist[j]}`] = {}
            if (!("periods" in obj[`${daylist[j]}`])) {
              obj[`${daylist[j]}`]['periods'] = [
                {
                  endingDay: true,
                  color: data[i]?.color,
                  // name: even[i]?.title
                }
              ]
            }
          }
        } else {
          if ([`${daylist[j]}`] in obj) {
            obj[`${daylist[j]}`]['periods'].push(
              {
                // endingDay: true,
                color: data[i]?.color,
                // name: even[i]?.title
              }
            )
          } else {
            obj[`${daylist[j]}`] = {}
            if (!("periods" in obj[`${daylist[j]}`])) {
              obj[`${daylist[j]}`]['periods'] = [
                {
                  // endingDay: true,
                  color: data[i]?.color,
                  // name: even[i]?.title
                }
              ]
            }
          }
        }
      }
    }
    setEvenRender(obj)
    // console.log(":d:: ", obj['2023-10-30'])

  }

  const onRefresh = () => {
    getData()
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={styles.container}>
            <View
              style={{
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Calendar
                markingType={"multi-period"}
                markedDates={evenRender}
                style={[styles.calendar, { width: WIDTH - 20 }]}
              />
              {evens?.length >= 0 && evens?.map((item, index) => (
                <ListCalendar key={index} item={item} />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

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
    marginBottom: 30,
  },

});
