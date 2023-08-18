import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link, useNavigate, useParams } from "react-router-native";
import { addUserToHouse } from "../../AppRoutes/AppRoutes";

import { commonStyles } from "../../styles/commonStyles";

const JoinHouseView = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [houseCode, setHouseCode] = useState("");
  const [invalidHouseCode, setInvalidHouseCode] = useState(false);
  const [userInHouseError, setUserInHouseError] = useState(false);

  const navigate = useNavigate();
  const { userId } = useParams();

  const handleSubmit = async () => {
    setInvalidHouseCode(false);
    setUserInHouseError(false);
    if (!houseCode) {
      setInvalidHouseCode(true);
      return;
    }
    setLoading(true);
    fetch(`http://localhost:8080/houses/v1/${houseCode}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        if (!userId || !data?.id) {
          setInvalidHouseCode(true);
        }
        fetch("http://localhost:8080/houseuser", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: String(userId),
            houseId: data.id,
          }),
        }).then((response) => {
          if (response.ok) {
            navigate(`/home/${houseCode}`, {
              state: {
                houseName: data.houseName,
                houseCode: data.houseCode,
                userId: userId,
                houseId: data.id,
              },
            });
          } else if (response.status === 422) {
            setUserInHouseError(true);
          }
        });
      });
    });
    setLoading(false);
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.headerContainer}>
        <Text style={{ ...commonStyles.header, paddingHorizontal: 10 }}>
          Join a House
        </Text>
        <TextInput
          placeholder="Enter house code"
          style={commonStyles.input}
          value={houseCode}
          onChangeText={setHouseCode}
          autoCapitalize="none"
        />
      </View>
      {invalidHouseCode && (
        <Text style={{ ...commonStyles.errorText, paddingHorizontal: 20 }}>
          You must enter a valid house code
        </Text>
      )}

      {userInHouseError && (
        <Text style={{ ...commonStyles.errorText, paddingHorizontal: 20 }}>
          You are already in this house
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

export default JoinHouseView;
