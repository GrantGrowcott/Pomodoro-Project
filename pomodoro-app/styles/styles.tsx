import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 1,
  },

  homeContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  taskContainer: {
    flex: 1,
    width: "100%",
    marginTop: 10,
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
    width: "40%",
    alignSelf: "center",
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
    backgroundColor: "#007A33",
    paddingVertical: 10,
    paddingHorizontal: 19,
    borderRadius: 25,
  },

  // Task Styles

  flatListContainer: {
    width: "100%",
    flex: 1,
    marginTop: 100,
  },

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
    marginTop: 20,
  },

  categoryIcon: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
    width: "30%",
    alignSelf: "center",
    marginTop: 0,
  },

  deleteButton: {
    width: "30%",
    padding: 10,
    marginTop: 20,
    backgroundColor: "#007A33",
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
    backgroundColor: "#007A33",
  },

  stopColor: {
    backgroundColor: "#D0312D",
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
    backgroundColor: "#007A33",
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
    backgroundColor: "#007A33",
    zIndex: 0,
  },
  row: {
    flexDirection: "row",
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
    backgroundColor: '#00000080', 
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    height:"-50%",
    width:"100%",
    padding: 40,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20, 
    alignItems: 'center',
    justifyContent:"flex-start",
    shadowColor: '#000',
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
    borderColor: "black",
    paddingLeft: 10,
    paddingVertical: 5,
    width: "100%",
    backgroundColor:  "#f5f1f1"
  },

  buttonClose: {
    backgroundColor: "#007A33",
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
    color: 'white',
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


  // R3F Canvas Styles

  canvasContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 50,
    margin: 20,
  },
});
