import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useNavigate, useParams, Link } from "react-router-native";
import { commonStyles } from "../../styles/commonStyles";

const CreateHouseView = (): JSX.Element => {
  const [houseName, setHouseName] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalidHouseName, setInvalidHouseName] = useState(false);

  const { userId } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!houseName) {
      setInvalidHouseName(true);
      return;
    }
    setLoading(true);
    fetch("http://localhost:8080/houses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        houseName: String(houseName),
        ownerId: String(userId),
      }),
    })
      .then((response) => {
        const resStatus = response.status;
        if (resStatus === 200) {
          response.json().then((data) => {
            navigate(`/home/${data.houseCode}`, {
              state: { houseName: houseName },
            });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={commonStyles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={{ ...commonStyles.header, paddingHorizontal: 10 }}>
          Create a House
        </Text>
        <TextInput
          placeholder="Enter your house name"
          style={commonStyles.input}
          value={houseName}
          onChangeText={setHouseName}
          autoCapitalize="none"
        />
      </View>
      {invalidHouseName && (
        <Text style={{ ...commonStyles.errorText, paddingHorizontal: 20 }}>
          You must enter a house name
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
      <Link to={`/mainmenu`}>
        <Text style={commonStyles.normalText}>Back</Text>
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

export default CreateHouseView;
