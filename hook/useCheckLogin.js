import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const getStorageValue = async (key) => {
    const value = await SecureStore.getItemAsync(key);
    if (value) {
        return value
    }
    return null;
}

const useCheckLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkLogin = async () => {
        const token = await getStorageValue("token");
        const role = await getStorageValue("role");
        const firstname = await getStorageValue("firstname")
        const lastname = await getStorageValue("lastname")
        const employee = await getStorageValue("employee")
        setIsLoggedIn(
            token !== null &&
            role !== null &&
            firstname !== null &&
            lastname !== null &&
            employee !== null
        )
    }

    useEffect(() => {
        checkLogin()
    }, []);



    return { isLoggedIn };
};
export default useCheckLogin;


