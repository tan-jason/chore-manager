import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useLocation, useParams } from "react-router-native";
import { commonStyles } from "../../styles/commonStyles";
import NavigationFooter from "../common/NavigationFooter";

const HomeWrapper = (): JSX.Element => {
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
      <ScrollView contentContainerStyle={{ alignItems: "flex-start" }}>
        <View
          style={{
            alignSelf: "flex-start",
            marginLeft: 30,
          }}
        >
          <Text style={commonStyles.linkText}>+ Add chore</Text>
        </View>
      </ScrollView>
      <NavigationFooter />
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

export default HomeWrapper;
