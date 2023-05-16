import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Link, useNavigate, useParams } from "react-router-native";
import { getUserByUsername } from "../../AppRoutes/AppRoutes";
import { commonStyles } from "../../styles/commonStyles";

type Props = {
  username: string;
};

const HomePageView = ({ username }: Props): JSX.Element => {
  const navigate = useNavigate();

  const handleNavigate = async (view: string) => {
    fetch(`http://localhost:8080/users/v1/${username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json().then((data) => {
          if (view === "create") {
            navigate(`/mainmenu/createHouse/${data.id}`);
          } else if (view === "join") {
            navigate(`/mainmenu/joinHouse/${data.id}`);
          } else if (view === "houses") {
            navigate(`/mainmenu/houses/${data.id}`);
          }
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={commonStyles.centerContainer}>
      <Text style={{ ...commonStyles.header, paddingTop: 160 }}>
        Chore Manager
      </Text>

      <View style={styles.buttonContainer}>
        <View style={styles.entryContainer}>
          <Pressable
            style={commonStyles.submitButton}
            onPress={() => handleNavigate("create")}
          >
            <Text style={commonStyles.submitText}>Create a House</Text>
          </Pressable>
        </View>

        <View style={styles.entryContainer}>
          <Pressable
            style={commonStyles.submitButton}
            onPress={() => handleNavigate("join")}
          >
            <Text style={commonStyles.submitText}>Join a House</Text>
          </Pressable>
        </View>

        <View style={styles.entryContainer}>
          <Pressable
            style={commonStyles.submitButton}
            onPress={() => handleNavigate("houses")}
          >
            <Text style={commonStyles.submitText}>Houses</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingLeft: 20,
    alignItems: "flex-start",
  },
  entryContainer: {
    paddingTop: 50,
    marginBottom: 16,
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
});

export default HomePageView;
