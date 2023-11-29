import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from "react-native";
import { Link, Stack, router, useRouter, useNavigation } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import Drawer from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";

const Layout = () => {
  const navigation = useNavigation()
  const ScreenHeaderButton = ({ text, to }) => {
    return (
      <Link href={to} asChild>
        <TouchableOpacity>
          <Text>{text}</Text>
        </TouchableOpacity>
      </Link>
    );
  };

  const [linkHome, setLinkHome] = useState(null)

  const checkLogin = async () => {
    const token = await SecureStore.getItemAsync("token");
    setLinkHome(token ? '/homein' : '/home')
  }

  useEffect(() => {
    checkLogin()
  }, [])

  const logo = () => {
    if (!linkHome) return
    return (
      <Link href={linkHome} asChild>
      <TouchableOpacity >
        <Image
          style={styles.logo_denso}
          source={require("public/denso.png")}
        />
      </TouchableOpacity>
      </Link>
    );
  };

  const login = () => {
    return (
      <Link href={"/login"} asChild>
        <TouchableOpacity>
          <Ionicons name={"person-circle-outline"} size={35} color={"gray"} />
          <Text style={{ fontSize: 12 }}>LogIn</Text>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#9fbbf6",
        },
      }}
    >
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="enroll/[id]"
        options={{
          headerTitle: "Enroll",
        }}
      />
      <Stack.Screen
        name="exam/[id]"
        options={{
          headerTitle: "Exam",
        }}
      />
      <Stack.Screen
        name="course/[id]"
        options={{
          headerTitle: "Course",
        }}
      />
      <Stack.Screen
        name="history/[id]"
        options={{
          headerTitle: "History",
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          headerTitleAlign: "center",
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => <ScreenHeaderButton text="Example" to="/example" />,
          headerRight: () => login(),
          headerTitle: () => logo(),
        }}
      />
      <Stack.Screen name="login"
        options={{
          headerTitleAlign: 'center',
          headerTitle: '',
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <ScreenHeaderButton text="Back" to="/home" />,
          // headerRight: () => login(),
          headerTitle: () => logo(),
        }}
      />
      <Stack.Screen
        name="about-us"
        options={{
          headerTitleAlign: 'center',
          headerTitle: '',
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <ScreenHeaderButton text="Back" to="/home" />,
          headerRight: () => login(),
          headerTitle: () => logo(),
        }}
      />

      {/* Exmaple page*/}
      <Stack.Screen
        name="example"
        options={{
          headerTitleAlign: "center",
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => null,
          headerRight: () => login(),
          headerTitle: () => logo(),
        }}
      />
    </Stack>
  );
};
export default Layout;

const styles = StyleSheet.create({
  logo_denso: {
    width: 160,
    height: 80,
  },

});
