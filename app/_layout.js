import { Stack } from "expo-router";
import { Text, View } from "react-native";
const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
            <Stack.Screen name="home" />
            <Stack.Screen name="login" />
            <Stack.Screen name="about-us" />
        </Stack>
    )
};
export default Layout;