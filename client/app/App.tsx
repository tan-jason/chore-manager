import React, { useEffect, useState } from "react";
import CreateUserView from "./components/view/CreateUserView";
import LoginView from "./components/view/LoginView";
import WelcomeView from "./components/view/WelcomeView";
import { NativeRouter, Route, Routes } from "react-router-native";
import HomePageView from "./components/view/HomePage";
import CreateHouseView from "./components/HouseViews/CreateHouseView";
import ViewHome from "./components/appflow/ViewHome";
import JoinHouseView from "./components/HouseViews/JoinHouseView";
import HousesView from "./components/HouseViews/HousesView";

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
          path="/mainmenu"
          element={<HomePageView username={username} />}
        />
        <Route path="/mainmenu/joinHouse/:userId" element={<JoinHouseView />} />
        <Route
          path="/mainmenu/createHouse/:userId"
          element={<CreateHouseView />}
        />
        <Route path="/mainmenu/houses/:userId" element={<HousesView />} />
        <Route path="/home/:houseCode" element={<ViewHome />} />
      </Routes>
    </NativeRouter>
  );
}
