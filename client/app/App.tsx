import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CreateUserView from "./components/view/CreateUserView";
import LoginView from "./components/view/LoginView";
import WelcomeView from "./components/view/WelcomeView";
import { commonStyles } from "./styles/commonStyles";
import { NativeRouter, Route, Routes } from "react-router-native";
import HomePageView from "./components/view/HomePage";

export default function App() {
  const [sessionActive, setSessionActive] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    try {
      fetch("http://localhost:8080/welcome", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setSessionActive(true);
            setUsername(data.username);
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <NativeRouter>
      <Routes>
        <Route
          path="/"
          element={sessionActive ? <HomePageView /> : <WelcomeView />}
        />
        <Route path="/login/:username" element={<LoginView />} />
        <Route path="/createUser" element={<CreateUserView />} />
        <Route path="/home" element={<HomePageView />} />
      </Routes>
    </NativeRouter>
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
