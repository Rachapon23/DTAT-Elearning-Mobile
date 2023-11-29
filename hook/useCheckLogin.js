import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const useCheckLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [debug, setDebug] = useState(null);

    const checkLogin = async () => {
        console.log('WTGG')
        // const token = await SecureStore.getItemAsync("token");
        // const file_token = await SecureStore.getItemAsync("file_token");
        // const firstname = await SecureStore.getItemAsync("firstname");
        // const role = await SecureStore.getItemAsync("role");
        // const user_id = await SecureStore.getItemAsync("user_id");
        console.log('isLoggedIn:')
        console.log('debug:', debug)
        // console.log(token);
        // setDebug(token)
        // setIsLoggedIn(() => token != null);
    }

    useEffect(() => {
        checkLogin()
    }, []);



    return { isLoggedIn };
};
export default useCheckLogin;


