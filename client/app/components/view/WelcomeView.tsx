import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Link, useNavigate } from "react-router-native";
import { commonStyles } from "../../styles/commonStyles";

const WelcomeView = (): JSX.Element => {
  const [username, setUsernameInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernotFound, setUsernotFound] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      fetch(`http://localhost:8080/users/v1/${username}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          setUsernotFound(false);
          res.json().then((data) => navigate(`/login/${data.username}`));
        } else if (res.status === 400) {
          setUsernotFound(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <View style={commonStyles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={{ ...commonStyles.header, paddingHorizontal: 10 }}>
          Chore Manager
        </Text>
        <TextInput
          placeholder="Enter your username"
          style={commonStyles.input}
          value={username}
          onChangeText={setUsernameInput}
          autoCapitalize="none"
        />
      </View>
      {usernotFound && (
        <Text style={{ ...commonStyles.errorText, paddingHorizontal: 20 }}>
          User not found, please create an account or re-enter username
        </Text>
      )}

      <Pressable
        style={commonStyles.submitButton}
        disabled={loading}
        onPress={handleSubmit}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={commonStyles.submitText}>Submit</Text>
        )}
      </Pressable>
      <Link to={"/createUser"}>
        <Text style={commonStyles.linkText}>Create an account</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    paddingTop: 50,
    paddingLeft: 20,
    alignItems: "flex-start",
  },
});

export default WelcomeView;
