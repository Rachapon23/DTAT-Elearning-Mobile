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
    // CheckBox,
} from "react-native";
import React, { useState, useEffect } from "react";
// import useFetch from "../../hook/useFetch";
import Ionicons from "react-native-vector-icons/Ionicons";



const ListQuiz = ({ item,setAnswer }) => {
    // console.log("QUIZE: ",item)
    const [selected, setSelected] = useState(null)
    const changeSelect = (quiz_id,index_ch) => {
        // console.log(quiz_id,index_ch)
        setAnswer((prev) => ({ ...prev, [`${quiz_id}`]: index_ch }))
        setSelected(index_ch)
    }
    return (
        <View style={styles.card}>
            <Text style={styles.question}>{item?.question}</Text>
            {item?.choices?.length <= 0 ? <></> : <>
                {item?.choices?.map((item_ch, index_ch) => (

                    <TouchableOpacity key={index_ch}
                        onPress={() => changeSelect(item?._id,index_ch)}>
                        <View style={styles.warpper}>
                            <View style={styles.radio}>
                                {selected == index_ch ? <View style={styles.radioBG}></View> : <></>}
                            </View>
                            <Text style={styles.textradio}>{item_ch}</Text>
                        </View>
                    </TouchableOpacity>

                ))}
            </>}
        </View>
    )
}

export default ListQuiz

const styles = StyleSheet.create({
    card: {
        backgroundColor: "rgba(159, 187, 246, 0.2)",
        padding: 10,
        marginBottom: 5,
        borderRadius: 5,
    },
    question: {
        fontSize: 16,
    },
    textradio: {
        fontSize: 14,
        // color: "black"
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 2,
        margin: 10
    },
    warpper: {
        flexDirection: "row",
        alignItems: "center"
    },
    radioBG: {
        backgroundColor: "green",
        height: 10,
        width: 10,
        margin: 3,
        borderRadius: 5,
    }
})