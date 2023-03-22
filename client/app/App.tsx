import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CreateUserView from "./components/view/CreateUserView";
import LoginView from "./components/view/LoginView";
import WelcomeView from "./components/view/WelcomeView";
import { commonStyles } from "./styles/commonStyles";

export default function App() {
  const [logIn, setLogIn] = useState(true);
  const [createUser, setCreateUser] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [username, setUsername] = useState("");
  const [inHomePage, setInHomePage] = useState(false);

  // useEffect(() => {
  //   fetch("/welcome")
  // }, [])

  return (
    <View style={styles.container}>
      {welcome && (
        <WelcomeView
          setUsername={setUsername}
          setCreateUser={setCreateUser}
          onClose={() => setWelcome(false)}
        />
      )}
      {createUser && (
        <CreateUserView
          onClose={(name) => {
            setCreateUser(false);
            setUsername(name ?? "");
          }}
          onBack={() => {
            setCreateUser(false);
            setWelcome(true);
          }}
          setHomePage={setInHomePage}
        />
      )}
      {logIn && (
        <LoginView
          setLoggedIn={(name) => {
            setInHomePage(true);
            setLogIn(false);
            setUsername(name || "");
          }}
          username={username}
        />
      )}
      {inHomePage && (
        <View style={commonStyles.container}>
          <Text style={commonStyles.header}>{`Welcome ${username}`}</Text>
        </View>
      )}
      {/* {loggedIn && (
        <Text style={styles.header}>Logged In Successfully</Text>
      )} */}
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
    marginTop: 20,
  },
});
