import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, Platform } from "react-native";
import { Link, Stack, router, useRouter, useNavigation } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import Drawer from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";

const getStorageValue = async (key) => {
  const value = await SecureStore.getItemAsync(key);
  if (value) {
    // alert(value)
    return value
  }
  return null;
}

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
    const token = await getStorageValue("token");
    const role = await getStorageValue("role");
    const firstname = await getStorageValue("firstname")
    const lastname = await getStorageValue("lastname")
    const employee = await getStorageValue("employee")
    setLinkHome(
      token !== null &&
      role !== null &&
      firstname !== null &&
      lastname !== null &&
      employee !== null ?
      '/homein' : '/home'
    )
  }

  useEffect(() => {
    checkLogin()
  }, [])

  const logo = () => {
    if (!linkHome) return
    return (
      <Link href={linkHome} asChild>
        <TouchableOpacity>
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

  const backHome = () => {
    return <ScreenHeaderButton text="Back" to="/home" />
  }


  const backArrow = () => {
    return (
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name={"chevron-back-outline"} size={35} color={"gray"} />
        {/* <Text style={{ fontSize: 12 }}>LogIn</Text> */}
      </TouchableOpacity>
    )
  }

  const pageHeader = (raw_page_name = "") => {
    // const name = raw_page_name.split('/')[0];
    // const page_name = name[0].toUpperCase() + name.substring(1);
    const page_name = raw_page_name
    return (
      <View style={{ height: 45, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Text style={{ fontSize: 17 }}>{page_name}</Text>
      </View>
    )
  }

  const showHeaderList = {
    'home': true,
    'login': true,
  }

  const hideLoginList = {
    'login': true,
    'course/[id]': true,
    'enroll/[id]': true,
    'exam/[id]': true,
    'about-us': true,
  }

  const hideBackHomeList = {
    'course/[id]': true,
    'enroll/[id]': true,
    'exam/[id]': true,
    'home': true,
  }

  const hideBackArrowList = {
    'home': true,
  }

  const header = () => {
    if (Platform.OS == 'ios') {
      const element = (props) => {
        const currentPage = props?.route?.name;
        const currentPageTitle = props?.options?.title;
        const hideLogin = hideLoginList[currentPage];
        const showPageHeader = showHeaderList[currentPage];
        const hideBackHome = hideBackHomeList[currentPage];
        const hideBackArrow = hideBackArrowList[currentPage];

        return (
          <View style={{ backgroundColor: "#9fbbf6", paddingBottom: 0, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ paddingLeft: 20, width: 60 }}>{!hideBackHome ? backHome() : (hideBackArrow ? null : backArrow())}</View>
            <View >{showPageHeader ? logo() : pageHeader(currentPageTitle)}</View>
            <View style={{ paddingRight: 20, width: 60 }}>{hideLogin ? null : login()}</View>
          </View>
        )
      }
      return {
        header: element
      }
    }
    else {
      return {
        headerStyle: {
          backgroundColor: "#9fbbf6",
        }
      }
    }
  }

  return (
    <Stack
      screenOptions={
        header()
      }
    >
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="enroll/[id]"
        options={{
          headerTitle: "Enroll",
          title: "Enroll",
        }}
      />
      <Stack.Screen
        name="exam/[id]"
        options={{
          headerTitle: "Exam",
          title: "Exam",
        }}
      />
      <Stack.Screen
        name="course/[id]"
        options={{
          headerTitle: "Course",
          title: "Course",
        }}
      />
      <Stack.Screen
        name="history/[id]"
        options={{
          headerTitle: "History",
          title: "History",
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          title: 'Home',
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
          title: 'Login',
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
          title: 'About Us',
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
