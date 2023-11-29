import { Tabs, router, useNavigation } from "expo-router";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import Drawer from "expo-router/drawer";
import { DrawerActions } from "@react-navigation/native";

const TabsLayout = () => {
  const [linkHome, setLinkHome] = useState(null)
  const navigation = useNavigation()

  const checkLogin = async () => {
    const link = await SecureStore.getItemAsync("token");
    setLinkHome(link ? '/homein' : '/home')
  }

  useEffect(() => {
    checkLogin()
  }, [])

  const logo = () => {
    if (!linkHome) return
    return (
      <Link href={linkHome} asChild>
        <TouchableOpacity style={styles.Touc_logo}>
          <Image
            style={styles.logo_denso}
            source={require("public/denso.png")}
          />
        </TouchableOpacity>
      </Link>
    );
  };

  const openDrawer = async () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  const logout = () => {
    return (
      <TouchableOpacity style={styles.Touc_logout} onPress={openDrawer}>
        <Ionicons name={"person-circle-outline"} size={35} color={"gray"} />
      </TouchableOpacity>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#9fbbf6",
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="learning"
        options={{
          headerTitleAlign: "center",
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => logo(),
          headerRight: () => logout(),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "book" : "book-outline";
            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerTitleAlign: "center",
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => logo(),
          headerRight: () => logout(),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "list" : "list-outline";
            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="homein"
        options={{
          headerTitleAlign: "center",
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => logo(),
          headerRight: () => logout(),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "home" : "home-outline";
            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          headerTitleAlign: "center",
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => logo(),
          headerRight: () => logout(),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "calendar" : "calendar-outline";
            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="browse-course"
        options={{
          headerTitleAlign: "center",
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => logo(),
          headerRight: () => logout(),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "search" : "search-outline";
            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  logo_denso: {
    width: 80,
    height: 40,
  },
  Touc_logo: {
    marginLeft: 10,
  },
  Touc_logout: {
    marginRight: 10,
  },
});
