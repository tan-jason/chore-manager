import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import { useNavigate, useParams } from "react-router-native";

const HousesView = () => {
  const [houses, setHouses] = useState([{}]);

  const { userId } = useParams();

  const navigate = useNavigate();

  const handleClickHouse = (house: any) => {
    navigate(`/home/${house.houseCode}`, {
      state: { houseName: house.houseName },
    });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/users/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          let key: number = 0;
          const housesInfo: any[] = [];
          data.houseNames.forEach((obj: any) => {
            housesInfo.push({ ...obj, key: key });
            key++;
          });
          setHouses(housesInfo);
          console.log(houses);
        });
      }
    });
  }, []);

  return (
    <>
      <Text
        style={{ ...commonStyles.header, paddingTop: 100, alignSelf: "center" }}
      >
        Chore Manager
      </Text>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.buttonContainer}>
          {houses.length > 0 ? (
            houses.map((house: any) => {
              return (
                <View style={styles.entryContainer}>
                  <TouchableOpacity onPress={() => handleClickHouse(house)}>
                    <View style={styles.touchableContainer}>
                      <Text style={styles.touchableText}>
                        {house.houseName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Text style={commonStyles.errorText}>
              You currently are not in any houses, please create or join a house
              to see Houses
            </Text>
          )}
        </View>
      </ScrollView>
      <Text
        style={{ ...commonStyles.normalText, paddingBottom: 20 }}
        onPress={() => navigate(-1)}
      >
        Back
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  touchableContainer: {
    marginBottom: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "#2196F3",
    minHeight: 25,
    borderRadius: 25,
  },
  touchableText: {
    textAlign: "center",
    padding: 20,
    color: "white",
  },
  buttonContainer: {
    alignItems: "center",
  },
  entryContainer: {
    paddingTop: 50,
    marginBottom: 16,
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
});

export default HousesView;
