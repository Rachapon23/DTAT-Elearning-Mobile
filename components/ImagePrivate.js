import { useState } from "react"
import * as SecureStore from 'expo-secure-store';
import { useEffect } from "react";
import { Image } from "react-native";
import { REACT_APP_IMG } from "@env";

const ImagePrivate = ({ path, file, style = { height: 200, width: 420, flex: 1 }, onError = (e) => console.log("ERROR", e.nativeEvent.error) }) => {
    const [data, setData] = useState(null)

    const getFileToken = async () => {
        const token = await SecureStore.getItemAsync('file_token')
        setData(`${REACT_APP_IMG}/${path}?file=${file}&token=${token}`)
        // console.log(data)
    }

    useEffect(() => {
        getFileToken()
    }, [data])

    return (
        <Image
            source={{ uri: data }}
            style={style}
            onError={onError}
        />
    )
}
export default ImagePrivate;