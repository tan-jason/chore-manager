import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { commonStyles } from "../../styles/commonStyles";

type Props = {
  setLoggedIn: (name?: string) => void;
  username: string;
};

const LoginView = ({ setLoggedIn, username }: Props): JSX.Element => {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameInput,
          password: password,
        }),
      }).then((response) => {
        const resStatus = response.status;
        if (resStatus === 200) {
          setLoggedIn(usernameInput);
          setIncorrectPassword(false);
        } else {
          setIncorrectPassword(true);
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.header}>Log In</Text>
      <View style={styles.loginContainer}>
        <TextInput
          placeholder="Username"
          style={commonStyles.input}
          value={usernameInput}
          onChangeText={setUsernameInput}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={commonStyles.input}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
      </View>

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
      {incorrectPassword && (
        <Text style={commonStyles.errorText}>Incorrect username/password</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    paddingTop: 50,
    paddingLeft: 20,
    alignItems: "flex-start",
  },
});

export default LoginView;
