import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useNavigate, useParams, Link, useLocation } from "react-router-native";
import { commonStyles } from "../../../styles/commonStyles";
import { createChore } from "../../../AppRoutes/AppRoutes";

const CreateChoreView = (): JSX.Element => {
  const [choreName, setChoreName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [invalidChoreName, setInvalidChoreName] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setInvalidChoreName(false);
    if (!choreName) {
      setInvalidChoreName(true);
      return;
    }
    setLoading(true);
    const result = await createChore(
      location.state.houseId,
      choreName,
      assignee,
      time
    );
    if (result) {
      navigate(-1);
    } else {
      setInvalidChoreName(true);
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={{ ...commonStyles.header, paddingHorizontal: 10 }}>
          Create a Chore
        </Text>
        <TextInput
          placeholder="Enter chore name"
          style={commonStyles.input}
          value={choreName}
          onChangeText={setChoreName}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Enter assignee username"
          style={commonStyles.input}
          value={assignee}
          onChangeText={setAssignee}
          autoCapitalize="none"
        />
      </View>
      {invalidChoreName && (
        <Text style={{ ...commonStyles.errorText, paddingHorizontal: 20 }}>
          You must enter a valid name for your chore
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
});

export default CreateChoreView;
