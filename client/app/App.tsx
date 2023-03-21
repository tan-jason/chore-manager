import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import LoginView from "./components/view/LoginView";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   fetch("/welcome")
  // }, [])

  return (
    <View style={styles.container}>
      {!loggedIn && (
        <LoginView setLoggedIn={setLoggedIn} />
      )}
      {loggedIn && (
        <Text style={styles.header}>Logged In Successfully</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  loginContainer: {
    paddingTop: 50,
    paddingLeft: 20,
    alignItems: "flex-start",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: "black",
    alignSelf: "center",
    marginRight: 20,
    marginTop: 20,
  },
  submitText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  errorText: {
    fontSize: 16,
    lineHeight: 21,
    color: "red",
    letterSpacing: 0.25,
    alignSelf: "center",
    marginRight: 20,
    marginTop: 20
  },
});
