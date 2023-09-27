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
import Theme1 from "../theme/Theme1";
import React, { useState } from "react";
import { router } from 'expo-router';

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
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogIn = () => {
    console.log("username: ",username);
    console.log("password: ",password);
    router.replace('/homein');
  };
  return (
    <SafeAreaView>
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
            <Text style={styles.text_login}>LogIn</Text>
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
