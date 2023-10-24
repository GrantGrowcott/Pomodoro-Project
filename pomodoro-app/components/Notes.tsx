import { View, TouchableOpacity } from "react-native";
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import { styles } from "../styles/styles";
import React from "react";
import Task from "./Task";
import TaskDisplay from "./TaskDisplay";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/FontAwesome";
import { iconSize } from "../constants";
import { colors } from "../constants";
import { useNavigation } from "@react-navigation/native";


const Notes = () => {
  const navigation = useNavigation();
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Task />
        <TaskDisplay />
        <View style={styles.navbar}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate("Home" as never)}>
              <Icon
                name="home-outline"
                size={iconSize.size}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Icons
              name="sticky-note"
              size={iconSize.size}
              color={colors.white}
            />
          </View>
        </View>
      </View>
    </Provider>
  );
};

export default Notes;
