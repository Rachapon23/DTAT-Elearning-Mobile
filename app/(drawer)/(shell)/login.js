import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Button,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Stack, Link } from "expo-router";
import Theme1 from "theme/Theme1";
import React, { useState } from "react";
import { router } from "expo-router";

import * as SecureStore from "expo-secure-store";
import useFetch from "hook/useFetch";

const ScreenHeaderButton = ({ text, to }) => {
  return (
    <Link href={to} asChild>
      <TouchableOpacity>
        <Text>{text}</Text>
      </TouchableOpacity>
    </Link>
  );
};

const content = () => {
  const [isLoading, setIsLoading] = useState(false);

  // router.replace("/homein");
  const [username, setUsername] = useState("6100319");
  const [password, setPassword] = useState("123456");

  const fetch = useFetch();

  const handleLogIn = async () => {
    setIsLoading(true)

    const payload = {
      // employee: "3",
      // password: "3",
      employee: username,
      password: password,
    };

    const data = await fetch.fetchData({
      method: "POST",
      endpoint: "login",
      payload,
    });
    if (!data?.error) {
      // console.log("data=>", JSON.stringify(data?.token))
      await SecureStore.setItemAsync("token", data?.token);
      await SecureStore.setItemAsync("file_token", data?.file_token);
      await SecureStore.setItemAsync("employee", data?.payload?.user?.employee);
      await SecureStore.setItemAsync("firstname", data?.payload?.user?.firstname);
      await SecureStore.setItemAsync("lastname", data?.payload?.user?.lastname);
      await SecureStore.setItemAsync("role", data?.payload?.user?.role);
      await SecureStore.setItemAsync("user_id", data?.payload?.user?.user_id);
      setIsLoading(false)

      router.replace("/homein");
    } else {
      setIsLoading(false)
      alert(data?.error);
    }
  };

  return (
    <SafeAreaView >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View>
            <View style={styles.view_input}>
              <Text>username</Text>
              <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
              />
            </View>
            <View style={styles.view_input}>
              <Text>password</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry
              />
            </View>
          </View>
          <TouchableOpacity style={styles.button_login} onPress={handleLogIn}>
            {isLoading ? <View><ActivityIndicator size="large" color="#ffa69a" /></View>
              : <Text style={styles.text_login}>LogIn</Text>
            }

          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Login = () => {
  return <Theme1 content={content()} />;
};
export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 20, alignItems: "center" },
  input: {
    height: 40,
    width: 300,
    borderWidth: 0.2,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  view_input: {
    marginBottom: 20,
  },
  button_login: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ffa69a",
    borderWidth: 1,
    borderRadius: 10,
    width: 200,
    height: 50,
    marginTop: 20,
  },
  text_login: {
    color: "#ffa69a",
  },
});
