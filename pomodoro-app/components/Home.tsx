import { View, TouchableOpacity } from "react-native";
import TorusDisplay from "../components/TorusDisplay";
import Timer from "../components/Timer";
import { styles } from "../styles/styles";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/FontAwesome";
import { colors } from "../constants";
import { iconSize } from "../constants";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const nav = useNavigation();
  return (
    <View style={styles.homeContainer}>
      <View style={styles.canvasContainer}>
        <TorusDisplay />
      </View>
      <View style={styles.container}>
        <Timer />
      </View>
      <View style={styles.navbar}>
        <View style={styles.row}>
          <Icon name="home" size={iconSize.size} color={colors.white} />
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => nav.navigate("Notes" as never)}>
            <Icons
              name="sticky-note-o"
              size={iconSize.size}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;
