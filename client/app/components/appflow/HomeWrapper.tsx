import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useLocation, useNavigate, useParams } from "react-router-native";
import { commonStyles } from "../../styles/commonStyles";
import NavigationFooter from "../common/NavigationFooter";
import CheckBox from "react-native-check-box";

const HomeWrapper = (): JSX.Element => {
  const [houseChores, setHouseChores] = useState([]);

  const { houseCode } = useParams();
  const location = useLocation();

  const navigate = useNavigate();

  const handleAddChore = () => {
    navigate(`/home/createChore`, {
      state: {
        houseCode: location.state.houseCode,
        houseId: location.state.houseId,
      },
    });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/houses/v1/${houseCode}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json().then((data) => setHouseChores(data.chores)));
  }, [location.state.houseCode]);

  return (
    <View style={commonStyles.container}>
      <Text style={{ ...commonStyles.header }}>{location.state.houseName}</Text>
      {houseChores.length > 0 ? (
        <ScrollView contentContainerStyle={{ alignItems: "flex-start" }}>
          {houseChores.map((chore: any) => {
            return (
              <View style={styles.entryContainer}>
                <View style={commonStyles.choreContainer}>
                  <Text style={commonStyles.choreText}>{chore.title}</Text>
                  <View style={styles.optionsContainer}>
                    <CheckBox
                      style={{ paddingBottom: 7 }}
                      isChecked={false}
                      onClick={() => {}}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <Text
          style={{
            ...commonStyles.linkText,
            alignSelf: "flex-start",
            marginLeft: 20,
          }}
          onPress={handleAddChore}
        >
          + Add chore
        </Text>
      )}

      <NavigationFooter
        chores={houseChores}
        currentPage={"HOME"}
        houseCode={houseCode || ""}
        houseName={location.state.houseName}
        userId={location.state.userId}
        houseId={location.state.houseId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    paddingTop: 50,
    paddingLeft: 20,
    alignItems: "flex-start",
  },
  entryContainer: {
    height: 50,
    flexDirection: "row",
    verticalAlign: "center",
    width: "95%",
    flex: 1,
  },
  optionsContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "space-between",
  },
});

export default HomeWrapper;
