import { StyleSheet } from "react-native";

export const ICON_SIZE = 26;

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingTop: 50,
    paddingLeft: 20,
    alignItems: "flex-start",
  },
  centerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    paddingHorizontal: 20,
    paddingTop: 80,
    marginBottom: 16,
  },
  submitButton: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: "black",
    alignSelf: "center",
    marginRight: 20,
    marginTop: 20,
    width: 250,
  },
  submitText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  errorText: {
    fontSize: 16,
    lineHeight: 21,
    color: "red",
    letterSpacing: 0.25,
    alignSelf: "center",
    marginRight: 20,
    marginTop: 20,
    flexWrap: "wrap",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
  linkText: {
    fontSize: 16,
    lineHeight: 21,
    color: "#3d85c6",
    letterSpacing: 0.25,
    alignSelf: "center",
    marginRight: 20,
    marginTop: 20,
  },
  normalText: {
    fontSize: 14,
    lineHeight: 21,
    color: "black",
    letterSpacing: 0.25,
    alignSelf: "center",
    marginRight: 20,
    marginTop: 20,
  },
  choreText: {
    fontSize: 20,
    lineHeight: 21,
    color: "black",
    letterSpacing: 0.25,
    alignSelf: "flex-start",
    paddingLeft: 20,
    paddingTop: 20,
  },
  choreContainer: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",
  },
});
