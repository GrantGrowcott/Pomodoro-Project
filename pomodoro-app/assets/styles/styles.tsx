import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 1
  },

  taskContainer: {
    flex: 1,
    width: "100%",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 2,
  },
  
  focusFont: {
    fontSize: 20,
  },

  dropdownContainer: {
    alignItems: "center",
    width: "100%",
  },

  dropdownStyle: {
    width: "40%",
    alignSelf: "center",
    marginTop: 10,
    minHeight: 40,
  },

  customDropdownContainer: {
    width: '40%',
    alignSelf: 'center',
   
    
    
  },
  textInputContainer: {
    width: "80%", 
    marginTop: 20,
    alignItems: "center", 
  },

  textInput: {
    backgroundColor: "#f5f1f1",
    textAlign: "center",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 25

  },

  titleInput : {
    width: "50%",  
  },

  taskInput: {
    width: "100%",
    marginVertical: 20,
  },
  
  submitButton: {
    backgroundColor: "#007A33",
    paddingVertical:  10,
    paddingHorizontal: 19,
    borderRadius: 25,

  },

  // Edit Styles

  noteContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
    width: "80%",
    alignSelf: "center",

  },

  textContainer: {
    textAlign: "center",
    marginTop: 20
  },

  deleteButton: {
    width: "30%",
    padding: 10,
    marginTop: 20,
    backgroundColor: "#6BB7FF",
    borderRadius: 30,
    alignItems: "center",
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


  // R3F Canvas Styles

  canvasContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 50,
    margin: 20,
  },
});
