import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LogBox,
} from "react-native";
import { commonStyles } from "../../../styles/commonStyles";
import { useLocation, useNavigate, useParams } from "react-router-native";
import NavigationFooter from "../../common/NavigationFooter";

LogBox.ignoreAllLogs();

const ChoreView = () => {
  const [chores, setChores] = useState([{}]);

  const location = useLocation();

  const navigate = useNavigate();

  const handleClickChore = (chore: any) => {
    navigate(`/home/chores/${chore.id}`, {
      state: { chore: chore },
    });
  };

  const handleAddChore = () => {
    navigate(`/home/createChore`, {
      state: {
        houseCode: location.state.houseCode,
        houseId: location.state.houseId,
      },
    });
  };

  useEffect(() => {
    setChores(location.state.chores);
  }, []);

  return (
    <>
      <View style={commonStyles.container}>
        <Text style={{ ...commonStyles.header }}>
          {`${location.state.houseName} - Chore View`}
        </Text>
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
        <ScrollView
          contentContainerStyle={{ alignItems: "flex-start", paddingLeft: 20 }}
        >
          <View style={styles.buttonContainer}>
            {chores.map((chore: any) => {
              return (
                <View style={styles.entryContainer}>
                  <View style={commonStyles.choreContainer}>
                    <Text
                      style={{ ...commonStyles.choreText, paddingLeft: 10 }}
                    >
                      {chore.title}
                    </Text>
                    <View style={styles.optionsContainer}>
                      <Text
                        style={{ ...commonStyles.linkText, paddingBottom: 30 }}
                      >
                        Edit
                      </Text>
                      <Text
                        style={{
                          ...commonStyles.normalText,
                          paddingBottom: 30,
                        }}
                      >
                        /
                      </Text>
                      <Text
                        style={{ ...commonStyles.errorText, paddingBottom: 30 }}
                      >
                        Remove
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <NavigationFooter
        chores={chores}
        currentPage="CHORES"
        houseCode={location.state.houseCode}
        houseName={location.state.houseName}
        userId={location.state.userId}
        houseId={location.state.houseId}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
  },
  entryContainer: {
    height: 50,
    flexDirection: "row",
    verticalAlign: "center",
    width: "95%",
    flex: 1,
    marginTop: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "space-between",
  },
});

export default ChoreView;
