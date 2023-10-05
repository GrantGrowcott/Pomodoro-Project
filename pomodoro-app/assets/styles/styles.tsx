import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  taskContainer: {
    flex: 1,
    width: "100%",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  focusFont: {
    fontSize: 20,
  },

  dropdownStyle: {
    width: "40%",
    alignSelf: "center",
    marginTop: 10,
    minHeight: 40,
  },

  taskInput: {
    width: "85%",
    marginTop: 20,
    backgroundColor: "#f5f1f1",
    textAlign: "center",
    borderRadius: 20,
  },

  // Timer styles

  timerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  button: {
    marginHorizontal: 5,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  timeButton: {
    backgroundColor: "#f5f1f1",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 3,
  },

  startColor: {
    backgroundColor: "#5ced73",
  },

  stopColor: {
    backgroundColor: "#D0312D",
  },
  gap: {
    width: 10,
  },

  timerMargin: {
    marginBottom: 10,
  },

  // R3F Canvas Styles

  canvasContainer: {
    flex: 1,
    backgroundColor: "#0080ff",
    borderRadius: 50,
    margin: 20,
  },
});
