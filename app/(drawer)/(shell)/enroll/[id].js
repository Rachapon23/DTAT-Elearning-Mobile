import { useLocalSearchParams } from "expo-router";
import useFetch from "hook/useFetch";
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Image,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert,
    ProgressViewIOS,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import ProgressBar from 'react-native-progress/Bar';
import { REACT_APP_IMG } from "@env";
import { useEffect, useState } from "react";
import Theme1 from "theme/Theme1";
import ListTopic from "components/ListTopic";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Calendar, LocaleConfig } from "react-native-calendars";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const DEFAULT_IMAGE =
    "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png";

// const { id } = useLocalSearchParams()

const content = () => {
    const { id } = useLocalSearchParams();

    const [course, setCourse] = useState([]);
    const [conditionData, setConditionData] = useState([]);
    const [courseResult, setCourseResult] = useState(false)
    const [registered, setRegistered] = useState(false)
    const [passedCondition, setPassedCondition] = useState(false)
    const [pageChange, setPageChange] = useState(false)
    const [even, setEven] = useState([]);
    const [month, setMonth] = useState("");
    const [evenRender, setEvenRender] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [isLoading_btn, setIsLoading_btn] = useState(false)


    const fetch = useFetch();
    const router = useRouter();

    const renderButton = () => {
        if (isLoading) {
            return <ActivityIndicator />
        }
        else {
            return (
                <TouchableOpacity
                    style={styles.registered_btn}
                    onPress={() => registered ? handleOpenCourse() : handleAddCourse()}
                >
                    <Text style={styles.registered_Text}>
                        {
                            registered ? "Go to Course" : "Add Course"
                        }
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    const isPassCondition = async (conditionData) => {
        // check registered
        await checkRegistered()
        // console.log("conditionData: ", conditionData)
        if (
            Array.isArray(conditionData) &&
            (
                conditionData.length === 0 ||
                course?.type === true
            )
        ) return setPassedCondition(true)

        // check plant
        let result = false
        for (let i = 0; i < conditionData.length; i++) {
            console.log("condition In Loop: ", conditionData[i], " plant: ", conditionData[i].plant.name, plant)
            if (conditionData[i].plant.name === plant) {
                console.log("plan:t: ", plant)
                result = true
                break
            }

            if (conditionData[i].current + 1 > conditionData[i].maximum) {
                result = false
                break
            }
        }

        // console.log("in plant: ", result)
        setPassedCondition(result)
        // setPageChange(true)
    }

    const checkRegistered = async () => {
        const user = await SecureStore.getItemAsync("user_id");
        const res = await fetch.fetchData({
            endpoint: `get-activity/?search=user:${user},course:${id}&fetch=_id,result`,
        });
        // console.log("RES:",res)
        if (res?.data) {
            setCourseResult(res?.data?.result)
            setRegistered(true)
        }
    }

    const getData = async () => {
        // console.log(id)
        const data = await fetch.fetchData({
            endpoint: `get-course/${id}?fetch=name,detail,image,condition,teacher,type&pops=path:condition$populate:plant$select:plant maximum current,path:teacher$select:firstname lastname -_id`,
        });
        setCourse(data?.data);
        const condition = await fetch.fetchData({
            endpoint: `list-condition/course/${id}`,
        });
        setConditionData(data?.data);
        isPassCondition(data?.data);

        getCalendar()
        if (data?.data) {
            setIsLoading_btn(false)
            setIsLoading(false)
        }

    };

    const onRefresh = () => {
        getData()
    }

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

    const getCalendar = async () => {
        let data = await fetch.fetchData({
            endpoint: `get-calendar/course/${id}`,
        });
        if (!data?.start) return
        setEven(data)
        setMonth(() => data.start.substring(0, 10))
        var daylist = getDaysArray(new Date(data?.start), new Date(data?.end));
        // console.log(daylist)
        let obj = {}
        for (let i = 0; i < daylist.length; i++) {
            if (i == 0) {
                obj[`${daylist[i]}`] = {
                    startingDay: true,
                    color: data.color,
                }
            } else if (i == daylist.length - 1) {
                obj[`${daylist[i]}`] = {
                    endingDay: true,
                    color: data.color,
                }
            } else {
                obj[`${daylist[i]}`] = {
                    // marked: true,
                    color: data.color,
                }
            }
        }
        setEvenRender(() => obj)

    };

    useEffect(() => {
        getData();
        return () => {
            setPageChange(false);
        }
    }, [pageChange]);

    const handleOpenCourse = () => {
        router.push(`course/{"course":"${id}"}`);
    }

    const handleAddCourse = async () => {
        console.log("handleAddCourse")
        setIsLoading_btn(true)

        if (!isPassCondition(conditionData)) {
            // alert user or something
            console.log("????")
            return
        }
        const user = await SecureStore.getItemAsync("user_id");
        const createActivity = await fetch.fetchData({ method: "POST", endpoint: "create-activity", payload: { user: `${user}`, course: `${id}` } });
        if (createActivity?.error) {
            alert(createActivity?.error)
        }
        if (createActivity?.data?._id) {
            setPageChange(true);
        }
    }


    return (
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
                {isLoading ? <View style={styles.loading}><ActivityIndicator size="large" color="#ffa69a" /></View>
                    : <View style={styles.container}>
                        <View style={styles.header}>
                            <Image
                                source={{
                                    uri: course?.image?.name
                                        ? REACT_APP_IMG + "/course/" + course?.image?.name
                                        : DEFAULT_IMAGE,
                                }}
                                style={styles.image}
                            />
                            <View style={styles.body}>
                                <Text style={styles.text_1}>{course?.name}</Text>
                                <Text style={styles.text_2}>{course?.detail}</Text>
                                <View style={styles.badge}>
                                    <Text >
                                        {course?.type ? "Public" : "Private"} Course
                                    </Text>
                                </View>
                                <Text style={styles.text_3}>
                                    By {course?.teacher?.firstname} {course?.teacher?.lastname}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.box}>
                            <TouchableOpacity style={styles.registered_btn}
                                onPress={() => registered ? handleOpenCourse() : handleAddCourse()}
                            >{isLoading_btn ? <View><ActivityIndicator color="#ffa69a" /></View>
                                : <Text style={styles.registered_Text}>
                                    {registered ? "Go to Course" : "Add Course"}
                                </Text>
                                }
                            </TouchableOpacity>
                        </View>
                        {course?.condition?.length > 0 && course?.condition?.map((item, index) => {
                            let persen = item?.current == 0 ? 0 : item?.current / item?.maximum
                            return (
                                <View key={index} style={styles.box}>
                                    <Text>Plant: {item.plant.name}</Text>
                                    <Text>Amount: {item.current} / {item.maximum}</Text>
                                    {true ? <View style={{paddingTop: 5}}>
                                        <ProgressBar
                                            width={null}
                                            progress={persen}
                                            indeterminate={false}
                                        />
                                    </View> : <View>
                                        <ProgressViewIOS
                                            style={styles.progress}
                                            progressTintColor=""
                                            progress={persen}
                                        />
                                    </View>}
                                </View>
                            )
                        })}
                        {even && month ? <View>
                            <Calendar
                                current={month}
                                markingType={"period"}
                                markedDates={evenRender}
                                style={[styles.calendar, { width: WIDTH - 20 }]}
                            />
                        </View> : <></>
                        }
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const Enroll = () => {
    return <Theme1 content={content()} />;
}

export default Enroll;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        backgroundColor: "rgba(159, 187, 246, 0.2)",
        paddingBottom: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    body: {
        padding: 10,
    },
    image: {
        height: (WIDTH - 20) / 1.7,
        width: WIDTH - 20,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    text_1: {
        color: "#222",
        fontSize: 18,
        fontWeight: "500",
    },
    text_2: {
        color: "#222",
        fontWeight: "400",
        fontSize: 14,
    },
    text_3: {
        color: "#0275d8",
        fontWeight: "400",
        fontSize: 14,
        marginTop: 10,
    },
    badge: {
        backgroundColor: "#fff",
        padding: 5,
        width: 120,
        borderRadius: 3,
        marginTop: 10,
    },
    box: {
        backgroundColor: "rgba(159, 187, 246, 0.2)",
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        textAlign: "center",
    },
    registered_btn: {
        backgroundColor: "#0275d8",
        padding: 5,
        borderRadius: 5,
    },
    registered_Text: { color: "#fff", textAlign: "center" },
    calendar: {
        borderRadius: 5,
        backgroundColor: "rgba(159, 187, 246, 0.2)",
        height: 320,
        marginBottom: 20,
    }, loading: {
        height: HEIGHT - 200,
        justifyContent: "center",
        alignItems: "center",
    }
});
