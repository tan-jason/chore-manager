import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigate, useParams } from "react-router-native";
import { commonStyles } from "../../styles/commonStyles";

const LoginView = (): JSX.Element => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const { username } = useParams();

  const navigate = useNavigate();

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
          setIncorrectPassword(false);
          navigate(`/mainmenu`);
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
      <Text style={commonStyles.header}>{`Welcome ${username}`}</Text>
      <View style={styles.loginContainer}>
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
      <Text style={commonStyles.normalText} onPress={() => navigate(-1)}>
        Back
      </Text>
      {incorrectPassword && (
        <Text style={commonStyles.errorText}>Incorrect password</Text>
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
