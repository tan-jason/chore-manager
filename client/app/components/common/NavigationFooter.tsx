import * as React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { commonStyles, ICON_SIZE } from "../../styles/commonStyles";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";

const NavigationFooter = (): JSX.Element => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <MIcon name="home" size={ICON_SIZE} />
          <Text>Home</Text>
        </View>

        <View style={styles.iconContainer}>
          <MIcon name="account-group" size={ICON_SIZE} />
          <Text>Participants</Text>
        </View>

        <View style={styles.iconContainer}>
          <MIcon name="note-edit-outline" size={ICON_SIZE} />
          <Text>Chores</Text>
        </View>

        <View style={styles.iconContainer}>
          <MIcon name="menu" size={ICON_SIZE} />
          <Text>Menu</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f9f4f2",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#b3b5b3",
    padding: 30,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "flex-start",
    paddingLeft: 35,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  iconContainer: {
    alignItems: "center",
  },
});

export default NavigationFooter;
