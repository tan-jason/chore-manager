import React, { useEffect, useState } from "react";
import CreateUserView from "./components/view/CreateUserView";
import LoginView from "./components/view/LoginView";
import WelcomeView from "./components/view/WelcomeView";
import { NativeRouter, Route, Routes } from "react-router-native";
import HomePageView from "./components/view/HomePage";
import CreateHouseView from "./components/HouseViews/CreateHouseView";
import ViewHome from "./components/appflow/ViewHome";

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
          element={
            sessionActive ? (
              <HomePageView username={username} />
            ) : (
              <WelcomeView />
            )
          }
        />
        <Route path="/login/:username" element={<LoginView />} />
        <Route path="/createUser" element={<CreateUserView />} />
        <Route
          path="/mainmenu/:username"
          element={<HomePageView username={username} />}
        />
        <Route
          path="/mainmenu/createHouse/:userId"
          element={<CreateHouseView />}
        />
        <Route path="/home/:houseId" element={<ViewHome />} />
      </Routes>
    </NativeRouter>
  );
}
