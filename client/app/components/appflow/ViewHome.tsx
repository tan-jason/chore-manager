import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocation, useParams } from "react-router-native";
import { commonStyles } from "../../styles/commonStyles";

const CreateHouseView = (): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const { userId } = useParams();
  const { state } = useLocation();

  return (
    <View style={commonStyles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={{ ...commonStyles.header, paddingHorizontal: 10 }}>
          {state.houseName}
        </Text>
      </View>
      {/* {usernotFound && (
        <Text style={{ ...commonStyles.errorText, paddingHorizontal: 20 }}>
          User not found, please create an account or re-enter username
        </Text>
      )} */}
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
