import { View, TouchableOpacity } from "react-native";
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import { styles } from "../styles/styles";
import React from "react";
import Task from "./Task";
import TaskDisplay from "./TaskDisplay";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/FontAwesome";
import { ICON_SIZE } from "../constants";

type NoteProps = {
  navigation: any;
};

const Notes: React.FC<NoteProps> = ({ navigation }) => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Task />
        <TaskDisplay />
        <View style={styles.navbar}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Icon
                name="home-outline"
                size={ICON_SIZE.size}
                color={ICON_SIZE.color}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Icons
              name="sticky-note"
              size={ICON_SIZE.size}
              color={ICON_SIZE.color}
            />
          </View>
        </View>
      </View>
    </Provider>
  );
};

export default Notes;
