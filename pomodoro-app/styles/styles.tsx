import { StyleSheet } from "react-native";
import { colors } from "../constants";



export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 1,
  },

  row: {
    flexDirection: "row",
  },

// Home Styles 
  homeContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },

  canvasContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 50,
    margin: 20,
  },

  // Task Styles

  taskContainer: {
    flex: 1,
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 2,
  },

  dropdownContainer: {
    alignItems: "center",
    width: "100%",
  },

  dropdownStyle: {
    marginTop: 10,
    minHeight: 40,
  },

  customDropdownContainer: {
    width: "40%",
    alignSelf: "center",
  },
  textInputContainer: {
    width: "80%",
    marginTop: 20,
    alignItems: "center",
  },

  textInput: {
    backgroundColor: colors.lightGrey,
    textAlign: "center",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 25,
  },

  titleInput: {
    width: "50%",
  },

  taskInput: {
    width: "100%",
    marginVertical: 20,
  },

  submitButton: {
    backgroundColor: colors.green,
    paddingVertical: 10,
    paddingHorizontal: 19,
    borderRadius: 25,
  },

  // TaskDisplay Styles

  flatListContainer: {
    width: "100%",
    flex: 1,
    marginTop: 100,
  },

  noteContainer: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
  },

  textContainer: {
    textAlign: "center",
    marginTop: 20,
  },

  categoryIcon: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.black,
    width: "30%",
    alignSelf: "center",
    marginTop: 0,
  },

  deleteButton: {
    width: "30%",
    padding: 10,
    marginTop: 20,
    backgroundColor: colors.green,
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
    backgroundColor: colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 3,
  },

  startColor: {
    backgroundColor: colors.green,
  },

  stopColor: {
    backgroundColor: colors.red,
  },
  gap: {
    width: 10,
  },

  // Header Styles

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: colors.green,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  navbar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    justifyItems: "center",
    paddingHorizontal: 60,
    paddingVertical: 10,
    backgroundColor: colors.green,
    zIndex: 0,
  },
  
  ellipsisContainer: {
    position: 'absolute',
    right: 10,
    bottom: 21,
    paddingTop: 15,
  },

  // Modal Styling

  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width:"100%",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: colors.lightBlack, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    height:"-50%",
    width:"100%",
    padding: 40,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20, 
    alignItems: 'center',
    justifyContent:"flex-start",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  outerContainer: {
    width: '100%'
  },

  modalInput: {
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: colors.black,
    paddingLeft: 10,
    paddingVertical: 5,
    width: "100%",
    backgroundColor: colors.lightGrey
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    right: 0,
    margin: 10, 
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 25
  },

  bottomGap : {
    marginBottom: 10,
    fontWeight: 'bold'
  },

});
