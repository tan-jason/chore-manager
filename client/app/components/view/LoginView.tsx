import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  setLoggedIn: (state: boolean) => void;
};

const LoginView = ({ setLoggedIn }: Props): JSX.Element => {
  const [username, setUsername] = useState("");
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
          username: username,
          password: password,
        }),
      }).then((response) => {
        const resStatus = response.status;
        if (resStatus === 200) {
          setLoggedIn(true);
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
    <View style={styles.container}>
      <Text style={styles.header}>Log In</Text>
      <View style={styles.loginContainer}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
      </View>

      <Pressable
        style={styles.submitButton}
        disabled={loading}
        onPress={handleSubmit}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.submitText}>Submit</Text>
        )}
      </Pressable>
      {incorrectPassword && (
        <Text style={styles.errorText}>Incorrect username/password</Text>
      )}
    </View>
  );
};

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

export default LoginView;
