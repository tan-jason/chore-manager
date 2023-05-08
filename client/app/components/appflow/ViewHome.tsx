import React, { useEffect, useState } from "react";
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

const ViewHome = (): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const { houseCode } = useParams();
  const location = useLocation();

  return (
    <View style={commonStyles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={{ ...commonStyles.header, paddingHorizontal: 10 }}>
          {location.state.houseName}
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

export default ViewHome;
