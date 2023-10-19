import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity } from "react-native";
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import TorusDisplay from "../components/TorusDisplay";
import Timer from "../components/Timer";
import { styles } from "../styles/styles";
import React from "react";
import { PomodoroSession } from "../backend/pomodoro";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/FontAwesome";
import { ICON_SIZE } from "../constants";

type HomeProps = {
  navigation: any;
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
  return (
    <Provider store={store}>
      <View style={styles.homeContainer}>
        <View style={styles.canvasContainer}>
          <TorusDisplay />
        </View>
        <View style={styles.container}>
          <Timer />
          <StatusBar style="auto" />
        </View>
        <View style={styles.navbar}>
          <View style={styles.row}>
            <Icon name="home" size={ICON_SIZE.size} color={ICON_SIZE.color} />
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate("Notes")}>
              <Icons
                name="sticky-note-o"
                size={ICON_SIZE.size}
                color={ICON_SIZE.color}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Provider>
  );
};

export default Home;
