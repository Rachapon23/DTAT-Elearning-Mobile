import { useLocalSearchParams } from "expo-router";
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    FlatList,
    StyleSheet,
    Dimensions,
    Image,
    Alert
} from "react-native";
import React, { useState, useEffect } from "react";

import Theme1 from "theme/Theme1";
import useFetch from "../../hook/useFetch";
import Ionicons from "react-native-vector-icons/Ionicons";
import ListQuiz from "components/ListQuiz";
import { useRouter } from "expo-router";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const content = () => {
    const fetch = useFetch();
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const params = JSON.parse(`${id}`);
    // console.log(params)
    const { data, isLoading, error, refetch } = useFetch({ endpoint: `/get-exam/${params?.exam}?field=quiz&check=enable` });

    const [answer, setAnswer] = useState({})

    function onSubmit() {
        Alert.alert('Notification', 'Are you sure to submit this exam', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    sendExam()
                }
            },
        ]);
    }
    async function sendExam() {
        console.log(params?.activity, { answer: answer })

        const res = await fetch.fetchData({
            method: "PUT",
            endpoint: `/update-activity/${params?.activity}/send-exam`,
            payload: { answer: answer }
        })
        .then(res => {
            router.push(`course/{"exam":"${params?.exam}","activity":"${params?.activity}","course":"${params?.course}"}`);
        }).catch(err => {
            Alert.alert('Error !!!', 'Error on update activity', [
                {
                    text: 'OK', onPress: () => {}
                }])
        });
        // console.log(res)

    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>

                    {data?.enable ? <>
                        <View style={styles.header}>
                            <Text style={styles.text_1}>{data?.name}</Text>
                            <Text style={styles.text_2}>{data?.detail}</Text>
                        </View>
                        {data?.quiz?.length <= 0 ? <View style={styles.data_empty}>
                            <Ionicons name={"file-tray-outline"} size={35} color={"gray"} />
                            <Text>no data</Text>
                        </View> : <>
                            {data?.quiz?.map((item, index) => (
                                <ListQuiz key={index} item={item} setAnswer={setAnswer} />
                            ))}
                        </>}
                        <View>
                            <TouchableOpacity style={styles.submit} onPress={onSubmit}>
                                <Text style={styles.textsubmit}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </> : <View style={styles.exam_disabled}>
                        <Ionicons name={"warning-outline"} size={35} color={"gray"} />
                        <Text>Exam not avaliable</Text>
                    </View>}

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const Exam = () => {
    return <Theme1 content={content()} />;
}

export default Exam;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },

    header: {
        padding: 10,
        backgroundColor: "rgba(159, 187, 246, 0.2)",
        borderRadius: 5,
        marginBottom: 10,

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
    exam_disabled: {
        height: HEIGHT - 500,
        justifyContent: "center",
        alignItems: "center",
    },
    submit: {
        backgroundColor: "#0275d8",
        padding: 10,
        borderRadius: 5,
    },
    textsubmit: {
        color: "#fff",
        textAlign: "center"
    }
});
