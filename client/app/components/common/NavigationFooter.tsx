import * as React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { commonStyles, ICON_SIZE } from "../../styles/commonStyles";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigate } from "react-router-native";

type Props = {
  chores: Array<any>;
  currentPage: "HOME" | "PARTICIPANTS" | "CHORES" | "MENU";
  houseCode: string;
  houseName: string;
  userId: string;
  houseId: number;
};

const getCurrentPageIconStyle = (
  page: string,
  currentPage: Props["currentPage"]
) => {
  if (page === currentPage) {
    return "#3d85c6";
  } else {
    return "black";
  }
};

const NavigationFooter = ({
  chores,
  currentPage,
  houseCode,
  houseName,
  userId,
  houseId,
}: Props): JSX.Element => {
  const navigate = useNavigate();

  const handleClickIcon = (icon: string) => {
    if (icon === "CHORES") {
      navigate(`/home/chores`, {
        state: {
          chores: chores,
          houseCode: houseCode,
          houseName: houseName,
          userId: userId,
          houseId: houseId,
        },
      });
    } else if (icon === "HOME") {
      navigate(`/home/${houseCode}`, {
        state: {
          houseCode: houseCode,
          houseName: houseName,
          userid: userId,
          houseId: houseId,
        },
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleClickIcon("HOME")}
        >
          <MIcon
            name="home"
            size={ICON_SIZE}
            color={getCurrentPageIconStyle("HOME", currentPage)}
          />
          <Text style={{ color: getCurrentPageIconStyle("HOME", currentPage) }}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer}>
          <MIcon
            name="account-group"
            size={ICON_SIZE}
            color={getCurrentPageIconStyle("PARTICIPANTS", currentPage)}
          />
          <Text
            style={{
              color: getCurrentPageIconStyle("PARTICIPANTS", currentPage),
            }}
          >
            Participants
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleClickIcon("CHORES")}
        >
          <MIcon
            name="note-edit-outline"
            size={ICON_SIZE}
            color={getCurrentPageIconStyle("CHORES", currentPage)}
          />
          <Text
            style={{ color: getCurrentPageIconStyle("CHORES", currentPage) }}
          >
            Chores
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer} onPress={() => {}}>
          <MIcon
            name="menu"
            size={ICON_SIZE}
            color={getCurrentPageIconStyle("MENU", currentPage)}
          />
          <Text style={{ color: getCurrentPageIconStyle("MENU", currentPage) }}>
            Menu
          </Text>
        </TouchableOpacity>
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
    paddingTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  iconContainer: {
    alignItems: "center",
  },
});

export default NavigationFooter;
