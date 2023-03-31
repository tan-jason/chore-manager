import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { commonStyles } from "../../styles/commonStyles";

const HomePageView = (): JSX.Element => {
  return (
    <View style={commonStyles.centerContainer}>
      <Text style={{ ...commonStyles.header, paddingTop: 160 }}>
        {`Chore Manager`}
      </Text>

      <View style={styles.welcomeContainer}>
        <View style={styles.entryContainer}>
          <Pressable style={commonStyles.submitButton}>
            <Text style={commonStyles.submitText}>Create a House</Text>
          </Pressable>
        </View>

        <View style={styles.entryContainer}>
          <Pressable style={commonStyles.submitButton}>
            <Text style={commonStyles.submitText}>Join a House</Text>
          </Pressable>
        </View>

        <View style={styles.entryContainer}>
          <Pressable style={commonStyles.submitButton}>
            <Text style={commonStyles.submitText}>Houses</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
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
});

export default HomePageView;
