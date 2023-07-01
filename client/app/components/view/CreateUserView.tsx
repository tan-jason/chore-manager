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

const CreateUserView = (): JSX.Element => {
  const [username, setUsernameInput] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameEmptyError, setNameEmptyError] = useState(false);
  const [userNameEmptyError, setUserNameEmptyError] = useState(true);
  const [passwordEmptyError, setPasswordEmptyError] = useState(false);
  const [confirmPasswordEmptyError, setConfirmPasswordEmptyError] =
    useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    if (password && confirmPassword !== password) {
      setLoading(false);
      setPasswordError(true);
      return;
    }
    try {
      fetch(`http://localhost:8080/users`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: String(username),
          password: String(password),
          name: String(name),
        }),
      }).then((res) => {
        if (res.ok) {
          navigate(`/mainmenu`);
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
          Chore Manager - Create a User
        </Text>
        <View style={styles.entryContainer}>
          <Text>Name *</Text>
          <TextInput
            placeholder="Enter your name"
            style={styles.entryInput}
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
        </View>

        <View style={{ ...styles.entryContainer, maxHeight: 95 }}>
          <View style={{}}>
            <Text>Username *</Text>
          </View>
          <TextInput
            placeholder="Enter your username"
            style={styles.entryInput}
            value={username}
            onChangeText={setUsernameInput}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.entryContainer}>
          <Text>Password *</Text>
          <TextInput
            placeholder="Enter your password"
            style={styles.entryInput}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.entryContainer}>
          <Text>Confirm Password *</Text>
          <TextInput
            placeholder="Confirm password"
            style={styles.entryInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>
      </View>
      {passwordError && (
        <Text style={{ ...commonStyles.errorText, paddingHorizontal: 20 }}>
          Passwords don't match, please confirm your password matches
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
      <Text style={commonStyles.normalText} onPress={() => navigate(-1)}>
        Back
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    paddingTop: 50,
    paddingLeft: 20,
    alignItems: "flex-start",
  },
  entryContainer: {
    paddingTop: 50,
    paddingLeft: 20,
    marginBottom: 16,
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  entryInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: "50%",
    alignSelf: "flex-end",
  },
});

export default CreateUserView;
